import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

export default (() => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <footer class={`${displayClass ?? ""} mooi-footer`}>
        <script defer src="https://events.vercount.one/js"></script>

        <div class="mooi-footer-count">
          <span>
            访问量{" "}
            <span id="vercount_value_page_pv" class="mooi-count-number">
              --
            </span>
          </span>

          <span class="mooi-footer-separator">|</span>

          <span>
            总访问量{" "}
            <span id="vercount_value_site_pv" class="mooi-count-number">
              --
            </span>
          </span>
        </div>

        <div class="mooi-footer-socials">
          <a
            class="mooi-social-card"
            href="tencent://message/?uin=3877526681&Site=mooi&Menu=yes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="QQ"
          >
            <span class="mooi-social-iconbox">
              <svg class="mooi-social-svg mooi-qq-svg" viewBox="0 0 96 96" aria-hidden="true">
                <ellipse cx="48" cy="45" rx="25" ry="32" fill="#111827" />
                <ellipse cx="48" cy="53" rx="16" ry="21" fill="#ffffff" />
                <circle cx="38" cy="34" r="5.2" fill="#ffffff" />
                <circle cx="58" cy="34" r="5.2" fill="#ffffff" />
                <circle cx="39" cy="35" r="2.1" fill="#111827" />
                <circle cx="57" cy="35" r="2.1" fill="#111827" />
                <path d="M38 43 Q48 51 58 43 Q53 61 48 61 Q43 61 38 43Z" fill="#ef4444" />
                <path d="M21 55 C9 61 9 75 15 80 C27 78 35 68 36 59Z" fill="#111827" />
                <path d="M75 55 C87 61 87 75 81 80 C69 78 61 68 60 59Z" fill="#111827" />
                <ellipse cx="35" cy="78" rx="12" ry="5" fill="#f59e0b" />
                <ellipse cx="61" cy="78" rx="12" ry="5" fill="#f59e0b" />
                <path d="M33 21 Q48 9 63 21" fill="none" stroke="#111827" stroke-width="8" stroke-linecap="round" />
              </svg>
            </span>
            <span class="mooi-social-name">QQ</span>
          </a>

          <a
            class="mooi-social-card"
            href="https://github.com/mooi-max"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <span class="mooi-social-iconbox">
              <span class="mooi-github-circle">
                <svg class="mooi-social-svg mooi-github-svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.41 7.86 10.94.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18A10.9 10.9 0 0 1 12 6.06c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.07.78 2.16v3.16c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                  />
                </svg>
              </span>
            </span>
            <span class="mooi-social-name">GitHub</span>
          </a>

          <a
            class="mooi-social-card"
            href="https://blog.csdn.net/2401_89382898"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CSDN"
          >
            <span class="mooi-social-iconbox">
              <span class="mooi-csdn-logo">csdn</span>
            </span>
            <span class="mooi-social-name">CSDN</span>
          </a>
        </div>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor