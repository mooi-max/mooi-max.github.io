import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import style from "./styles/recentPosts.scss"

function getPageDate(page: QuartzComponentProps["allFiles"][number]) {
  return page.dates?.published ?? page.dates?.modified ?? page.dates?.created ?? new Date(0)
}

function formatDate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}年${m}月${d}日`
}

function getTags(page: QuartzComponentProps["allFiles"][number]) {
  const raw = page.frontmatter?.tags
  if (!raw) return []

  const tags = Array.isArray(raw) ? raw : [raw]
  return tags.map(String).slice(0, 3)
}

const RecentPosts: QuartzComponent = ({ fileData, allFiles }) => {
  if (fileData.slug !== "index") {
    return null
  }

  const pages = allFiles
    .filter((page) => {
      const slug = String(page.slug ?? "")

      return (
        slug !== "index" &&
        !slug.endsWith("/index") &&
        !slug.startsWith("tags/")
      )
    })
    .sort((a, b) => getPageDate(b).getTime() - getPageDate(a).getTime())

  return (
    <div class="mooi-recent-posts">
      {pages.map((page) => {
        const slug = String(page.slug ?? "")
        const title =
          page.frontmatter?.title ??
          slug.split("/").filter(Boolean).pop() ??
          "未命名文章"

        const tags = getTags(page)

        return (
          <div class="mooi-post-row">
            <div class="mooi-post-date">{formatDate(getPageDate(page))}</div>

            <a class="mooi-post-title internal" href={resolveRelative(fileData.slug!, page.slug!)}>
              {title}
            </a>

            <div class="mooi-post-tags">
              {tags.map((tag) => (
                <span class="mooi-post-tag">#{tag}</span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

RecentPosts.css = style

export default (() => RecentPosts) satisfies QuartzComponentConstructor