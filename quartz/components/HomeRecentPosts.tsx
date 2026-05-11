import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"
import { Date, getDate } from "./Date"
import { byDateAndAlphabetical } from "./PageList"
import { i18n } from "../i18n"
import listPageStyle from "./styles/listPage.scss"

const HomeRecentPosts: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, allFiles, cfg } = props

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
    .sort(byDateAndAlphabetical(cfg))

  return (
    <div class="mooi-home-recent-posts">
      <ul class="section-ul">
        {pages.map((page) => {
          const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
          const rawTags = page.frontmatter?.tags ?? []
          const tags = Array.isArray(rawTags) ? rawTags : [rawTags]

          return (
            <li class="section-li">
              <div class="section">
                {page.dates && (
                  <p class="meta">
                    <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                  </p>
                )}

                <div class="desc">
                  <h3>
                    <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                      {title}
                    </a>
                  </h3>
                </div>

                <ul class="tags">
                  {tags.slice(0, 3).map((tag) => (
                    <li>
                      <a
                        class="internal tag-link"
                        href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                      >
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

HomeRecentPosts.css =
  listPageStyle +
  `
body[data-slug="index"] .content-meta {
  display: none;
}

body[data-slug="index"] article.popover-hint {
  display: none;
}

body[data-slug="index"] .section-ul {
  margin-top: 2rem;
}

body[data-slug="index"] .section-li {
  margin-bottom: 1.15rem;
}

body[data-slug="index"] .section {
  align-items: center;
}

body[data-slug="index"] .section h3 {
  margin: 0;
}

body[data-slug="index"] .section .desc h3 a {
  color: var(--secondary);
  font-size: 1.15rem;
  font-weight: 700;
  background-color: transparent;
  text-decoration: none;
}

body[data-slug="index"] .section .desc h3 a:hover {
  color: var(--tertiary);
}

body[data-slug="index"] .section .meta {
  color: var(--gray);
  font-weight: 600;
  opacity: 0.72;
}

body[data-slug="index"] .section > .tags {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  flex-wrap: nowrap;
  white-space: nowrap;
}

body[data-slug="index"] .section > .tags > li {
  margin: 0;
}

body[data-slug="index"] .section > .tags .tag-link {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.18rem 0.6rem;
  background: color-mix(in srgb, var(--secondary) 14%, transparent);
  color: var(--secondary);
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}

body[data-slug="index"] .section {
  grid-template-columns: 9rem minmax(0, 1fr) max-content;
  column-gap: 1.2rem;
}

@media all and (max-width: 800px) {
  body[data-slug="index"] .section {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  body[data-slug="index"] .section .desc {
    grid-row: 1;
  }

  body[data-slug="index"] .section .meta {
    grid-row: 2;
  }

  body[data-slug="index"] .section > .tags {
    grid-row: 3;
    display: flex;
    justify-content: flex-start;
  }
}
`

export default (() => HomeRecentPosts) satisfies QuartzComponentConstructor