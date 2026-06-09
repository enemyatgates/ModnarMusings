---
title: The Code Snippet
type: page
---

The Code

```yml
baseURL = "/"

title = "Modnar Musings"
theme = "HugoBook"

languageCode = "en-us"
canonifyURLs = true
relativeURLs = false

[params]
    HideCopyright = true
    ShowBreadCrumbs = true
    ShowBreadCrumbsInPost = true
    ShowCodeCopyButtons = true
    ShowPostNavLinks = true
    ShowReadingTime = true
    ShowShareButtons = true
    ShowSidebar = true
    ShowToc = true
    TocOpen = true
    dateFormat = "Monday, January 02, 2006 @ 15:04:05 MST"
    defaultTheme = "auto"
    disableThemeToggle = false
    BookSection = "documents"
    BookLogo = "images/logo.png"

[menu]
    [[menu.main]]
        name = "Home"
        url = "/"
        weight = 1

    [[menu.main]]
        name = "Blog"
        url = "/blog/"
        weight = 2

    [[menu.main]]
        name = "About"
        url = "/about/"
        weight = 3

    [[menu.main]]
        name = "Posts"
        url = "/posts/"
        weight = 4

[params.assets]
    customCSS = ["css/custom.css"]

[markup]
    [markup.goldmark]
        [markup.goldmark.renderer]
            unsafe = true

#[params.homeInfoParams]
#  Title = "Welcome to Modnar Musings"
#  Content = "We build elegant, open-source digital experiences. Explore our writing, projects, and ideas."

```