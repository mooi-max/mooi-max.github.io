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
              <img class="mooi-social-img mooi-qq-img" src="/static/icons/qq.svg" alt="QQ" />
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
              <span class="mooi-icon-light-bg mooi-github-bg">
                <img
                  class="mooi-social-img mooi-github-img"
                  src="/static/icons/github.svg"
                  alt="GitHub"
                />
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
              <span class="mooi-icon-light-bg mooi-csdn-bg">
                <img class="mooi-social-img mooi-csdn-img" src="/static/icons/csdn.svg" alt="CSDN" />
              </span>
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