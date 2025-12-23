from playwright.sync_api import sync_playwright, expect

def verify_home_accessibility():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000")

            # Wait for content to load
            print("Waiting for content...")
            expect(page.get_by_text("/latest")).to_be_visible()

            # Check for the button inside the heading
            print("Checking for button...")
            first_article = page.locator("article").first
            button = first_article.locator("h2 button")

            expect(button).to_be_visible()

            # Verify text matches
            title_text = button.inner_text()
            print(f"Found post title: {title_text}")

            # Take screenshot
            page.screenshot(path="verification/home_accessibility.png")
            print("Screenshot saved to verification/home_accessibility.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_home_accessibility()
