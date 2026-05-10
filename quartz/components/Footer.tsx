import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

export default (() => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <footer class={`${displayClass ?? ""} mooi-footer`}>
        <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>

        <div class="mooi-footer-count">
          <span>
            访问量{" "}
            <span id="busuanzi_container_site_pv">
              <span id="busuanzi_value_site_pv">--</span>
            </span>
          </span>

          <span class="mooi-footer-separator">|</span>

          <span>
            总访客量{" "}
            <span id="busuanzi_container_site_uv">
              <span id="busuanzi_value_site_uv">--</span>
            </span>
          </span>
        </div>

        <div class="mooi-footer-socials">
          <a
            class="mooi-social-card"
            href="你的QQ链接"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="mooi-social-iconbox">
              <img
                class="mooi-social-icon"
                src="https://cdn.simpleicons.org/tencentqq/19e6ff"
                alt="QQ"
              />
            </span>
            <span class="mooi-social-name">QQ</span>
          </a>

          <a
            class="mooi-social-card"
            href="https://github.com/mooi-max"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="mooi-social-iconbox">
              <img
                class="mooi-social-icon"
                src="https://cdn.simpleicons.org/github/8b5cf6"
                alt="GitHub"
              />
            </span>
            <span class="mooi-social-name">GitHub</span>
          </a>

          <a
            class="mooi-social-card"
            href="你的CSDN链接"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="mooi-social-iconbox">
              <img
                class="mooi-social-icon"
                src="https://cdn.simpleicons.org/csdn/37ff8b"
                alt="CSDN"
              />
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