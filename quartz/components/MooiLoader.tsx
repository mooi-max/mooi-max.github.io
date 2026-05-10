import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/mooiLoader.scss"

const MooiLoader: QuartzComponent = () => {
  return (
    <>
      <div id="mooi-loader" aria-hidden="true">
        <div class="mooi-loader-inner">
          <div class="mooi-taiji-wrap">
            <svg
              class="mooi-taiji"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="loading"
            >
              <circle cx="50" cy="50" r="48" fill="#f5f5f5" />
              <path
                d="M50 2a48 48 0 0 1 0 96a24 24 0 0 1 0-48a24 24 0 0 0 0-48z"
                fill="#050505"
              />
              <circle cx="50" cy="26" r="8" fill="#050505" />
              <circle cx="50" cy="74" r="8" fill="#f5f5f5" />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="rgba(255,255,255,0.55)"
                stroke-width="1.2"
              />
            </svg>
          </div>

          <div class="mooi-loading-text">LOADING...</div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              const loader = document.getElementById("mooi-loader")
              if (!loader) return

              const start = Date.now()
              const minShowTime = 500

              const hideLoader = () => {
                const elapsed = Date.now() - start
                const delay = Math.max(0, minShowTime - elapsed)

                window.setTimeout(() => {
                  loader.classList.add("mooi-loader-hidden")

                  window.setTimeout(() => {
                    loader.remove()
                  }, 520)
                }, delay)
              }

              if (document.readyState === "complete") {
                hideLoader()
              } else {
                window.addEventListener("load", hideLoader, { once: true })
              }

              loader.addEventListener("click", hideLoader)
            })()
          `,
        }}
      />
    </>
  )
}

MooiLoader.css = style

export default (() => MooiLoader) satisfies QuartzComponentConstructor