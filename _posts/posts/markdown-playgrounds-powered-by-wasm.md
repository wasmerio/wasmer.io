---
title: 'Introducing Markdown Playgrounds - Powered by WebAssembly'
description: 'Introducing Markdown Playgrounds - Powered by WebAssembly'
publishedAt: '2022-04-22T18:00:00.000Z'
author:
  name: 'Syrus Akbary'
  picture: '/images/syrus.png'
status: 'published'
---

In [WAPM](https://wapm.io/), we have been thinking about how we can enable live coding on the code snippets inside Markdown Readme files.

> WAPM is the Package Manager for WebAssembly modules. It allows anyone to create, distribute, and use web assembly packages based on WebAssembly anywhere: from servers to browsers.

Until today, interacting with online code snippets was complicated. The overhead is very high for developers with limited experience in a new language or for languages that require complex toolchains like Zig or Clang.

But not any longer!

We have created an easy way to allow interaction with any code from markdown files using fully sandboxed WebAssembly WAPM packages.

Here's the demo!

<video width="960" height="720" controls preload="auto" autoplay loop muted>
  <source src="/images/blog/wapm-playground.mp4" type="video/mp4">
  <source src="/images/blog/wapm-playground.mov" type="video/quicktime">
</video>

> You can also play with the demo online in [wapm.io/python/python](https://wapm.io/python/python)

## How to create a playgrounds

To make the code snippets interactive in your `.md` files, you need to add `YAML` annotations to the file as described below and an extra tag in the code snippet.

First, you will need to include the `playground` annotation next to your language of choice. The annotation defines the string to `run` code, and it's saved in the `$CODE` environment variable.

```yaml
---
playground:
  python:
    run: echo $CODE > example.py ; python -i example.py
---

```

The `run` field defines how the code inside the editor will be "run" in the shell.

Once that's added, you will need to add the `playground` tag next to the language for the code section: Instead of using `` python` we will use  ``python playground`

For example, the README.md for Python can look like the following:

<pre>
<code class="hljs language-markdown">---
playground:
  python:
    run: echo $CODE > example.py ; python -i example.py
---

Here's the Playground:

```python playground
name = input("What's your name? ")
print(f"Hello, {name}!")
```</code>
</pre>

The above code snippet produces the Markdown file, and it renders in [WAPM.io](http://wapm.io/)
 like this:

![WAPM Playground rendered](/images/blog/wapm-playground-rendered.png)

If you're familiar with [Jupyter Notebooks](https://jupyter.org/), you might have noticed this concept is very similar. However, there is one exception; WebAssembly powers WAPM markdown playgrounds. It makes it possible to define how to run the code inside the playground, so it's way more pluggable and easy to use!

We can't wait to see what you will do with it!

Do you want to play with this? We have good news for you! It's already integrated it into the following packages for your use:

- Python: [https://wapm.io/python/python](https://wapm.io/python/python)
- Ruby: [https://wapm.io/katei/irb](https://wapm.io/katei/irb)
- Zig: [https://wapm.io/topolarity/zig](https://wapm.io/topolarity/zig)
- Sqlite: [https://wapm.io/sqlite/sqlite](https://wapm.io/sqlite/sqlite)
