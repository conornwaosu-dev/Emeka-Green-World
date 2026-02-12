# Emeka Green World

**Live site:** [**emekagreen.com**](https://www.emekagreen.com)  
**EPK (press kit):** [**emekagreen.com/epk.html**](https://www.emekagreen.com/epk.html)

*If you only see “Emeka Green World” and a bit of text, you’re on the GitHub repo page. Use the links above to see the real site (cover image, listen button, gallery).*

---

## How to view your site on your computer

You need to run a small “server” so the site (and the music) works. Do this whenever you want to look at the site.

### Step 1: Open the Terminal

- In Cursor, look at the **top menu bar** and click **Terminal**.
- Click **New Terminal**.
- A box will appear at the **bottom** of the window. That’s the terminal. Leave it open.

*(You can also press **Ctrl + `** to open it.)*

### Step 2: Start the server

In that terminal box, type this and press **Enter**:

```
cd /Users/conoroneillnwaosu/Documents/Emeka-Green-World
```

Then type this and press **Enter**:

```
python3 -m http.server 8000
```

You should see a line like: `Serving HTTP on ... port 8000`

**Leave this terminal open.** Don’t close it while you’re using the site.

### Step 3: Open the site in your browser

1. Open **Safari** (or Chrome, Firefox).
2. Click in the **address bar** at the top.
3. Type: **localhost:8000**
4. Press **Enter**.

You should see the main Emeka Green page (cover image, listen button, gallery).

---

## Your two pages

| Page   | Link to type in the browser        |
|--------|------------------------------------|
| Main site (music, gallery) | **http://localhost:8000**          |
| EPK page                   | **http://localhost:8000/epk.html** |

---

## If something goes wrong

- **“Can’t connect” or page won’t load**  
  Make sure the terminal is still open and you ran both commands (the `cd` one and the `python3` one). Try the two commands again.

- **You closed the terminal**  
  Do Step 1 and Step 2 again. The server only runs while that terminal is open.

- **Music doesn’t play**  
  Use the links above (with `localhost:8000`). Don’t open the HTML file by double‑clicking it in Finder.

---

When you put the site on **GitHub Pages**, it will have its own link and you won’t need to run this server on your computer.
