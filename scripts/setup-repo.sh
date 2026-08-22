#!/usr/bin/env bash
set -euo pipefail

RULESET_NAME="Protect Major Branch"

if ! command -v gh > /dev/null 2>&1; then
  echo "エラー: GitHub CLI (gh) が見つかりません。https://cli.github.com/ からインストールしてください。" >&2
  exit 1
fi

if ! gh auth status > /dev/null 2>&1; then
  echo "エラー: gh にログインしていません。'gh auth login' を実行してください。" >&2
  exit 1
fi

if ! REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2> /dev/null); then
  echo "エラー: GitHub リポジトリを特定できませんでした。リポジトリのルートで実行してください。" >&2
  exit 1
fi

echo "対象リポジトリ: ${REPO}"
echo "各設定について適用するかを確認します。"
echo

confirm() {
  local answer
  read -r -p "$1 [y/N]: " answer
  [[ ${answer} =~ ^[yY]$ ]]
}

apply_repo_setting() {
  local field=$1 desired=$2 label=$3
  local current
  current=$(gh api "repos/${REPO}" --jq ".${field}")

  if [ "${current}" = "${desired}" ]; then
    echo "スキップ: ${label} は既に ${desired} です。"
    echo
    return
  fi

  echo "${label}"
  echo "  現在: ${current} → 変更後: ${desired}"
  if confirm "  適用しますか?"; then
    gh api -X PATCH "repos/${REPO}" -F "${field}=${desired}" > /dev/null
    echo "  適用しました。"
  else
    echo "  スキップしました。"
  fi
  echo
}

apply_ruleset() {
  if gh api "repos/${REPO}/rulesets" --jq '.[].name' | grep -qxF "${RULESET_NAME}"; then
    echo "スキップ: ルールセット「${RULESET_NAME}」は既に存在します。"
    echo
    return
  fi

  echo "ブランチ保護ルールセット「${RULESET_NAME}」"
  echo "  デフォルトブランチと release ブランチへの削除・force push を禁止します。"
  echo "  あわせて Codecheck / Playwright の成功を必須にし、PR 経由でのみ変更できるようにします。"
  echo "  (これがないと Dependabot の auto-merge が CI の完了を待たずにマージされます)"
  if confirm "  作成しますか?"; then
    gh api -X POST "repos/${REPO}/rulesets" --input - > /dev/null << JSON
{
  "name": "${RULESET_NAME}",
  "target": "branch",
  "enforcement": "active",
  "bypass_actors": [],
  "conditions": {
    "ref_name": {
      "include": ["~DEFAULT_BRANCH", "refs/heads/release"],
      "exclude": []
    }
  },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": false,
        "do_not_enforce_on_create": true,
        "required_status_checks": [
          { "context": "codecheck" },
          { "context": "test" }
        ]
      }
    }
  ]
}
JSON
    echo "  作成しました。"
  else
    echo "  スキップしました。"
  fi
  echo
}

cleanup() {
  echo "このスクリプトは初回セットアップ専用です。以下を削除できます。"
  echo "  - scripts/setup-repo.sh (このスクリプト)"
  echo "  - package.json の setup:repo スクリプト"
  echo "  - README.md のセットアップ手順"
  if ! confirm "削除しますか?"; then
    echo "残しました。あとで手動で削除してください。"
    exit 0
  fi

  local root tmp
  root=$(git rev-parse --show-toplevel)
  tmp=$(mktemp)

  if [ -f "${root}/package.json" ]; then
    grep -v '"setup:repo":' "${root}/package.json" > "${tmp}"
    mv "${tmp}" "${root}/package.json"
  fi

  if [ -f "${root}/README.md" ]; then
    tmp=$(mktemp)
    sed '/<!-- setup-repo:start -->/,/<!-- setup-repo:end -->/d' "${root}/README.md" \
      | awk 'BEGIN { blank = 0 } /^$/ { blank++; if (blank > 1) next } !/^$/ { blank = 0 } { print }' > "${tmp}"
    mv "${tmp}" "${root}/README.md"
  fi

  rm -f "${root}/scripts/setup-repo.sh"
  rmdir "${root}/scripts" 2> /dev/null || true

  echo "削除しました。変更内容を確認してコミットしてください。"
  exit 0
}

apply_repo_setting "delete_branch_on_merge" "true" "マージ後にヘッドブランチを自動削除する"
apply_repo_setting "allow_auto_merge" "true" "auto-merge を許可する (Dependabot auto-merge に必要)"
apply_ruleset
cleanup
