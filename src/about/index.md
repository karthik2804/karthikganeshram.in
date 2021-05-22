---
layout: about.njk
---
### Work
I last worked as a project assosicate in a communications system project at Indian Institute of Technology, Madras from August 2020 to April 2021. 

I am currently preparing for my Master's degree.

### Professional Interests

I am really passionate about computer architecture and looking to understand it in depth so that I can contribute to the field. Parallel/Distributed computing is something that interests me a lot.

I also enjoy developing websites and web apps. I am excited to learn about technologies involved in the web right from the network layer to the front-end web development.

### Other Interests
When I am not working or studying, I like to play football (soccer). I enjoy listening to music and also a bit of gaming. Photography is something I do once in a while, checkout my photos at [Instagram]({{author.social.instagram.url}})

I have recently found an interest in philosphy and enjoy reading books to explore new perspectives.

### Music
I prefer rock music as a genre the most but enjoy most kinds of music.
#### Some favourites
- Sound of Silence (Distured cover)
- The Silence (Manchester Orchestra)
- Nothing else matters (metallica)
- "Human" and "Skin" by (Rag 'n' Bone Man)

<form class="form" action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSf2pwkf_MjEWosXgLZRAiC7eztx44jjwcHv-S7cdhF5sFCFVQ/formResponse" target="music_hidden_iframe">
    <div class="d-flex w-100">
        <div class="group" style="flex-grow:1;">
            <input class="textbox" id="music-name" name="entry.917479398" type="text" autocomplete="off" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label id="music-label">Suggest a Song/Album</label>
        </div>
        <div class="group">
        <input class="submitButton" type="submit" value="Submit">
        </div>
    </div>
</form>

### Books
#### Suggested Reads
- "The Subtle art of not giving a f*ck" by Mark Mason
- "The monk who sold his ferrari" by Robin Sharma
#### Currently reading
- "Everything is f*cked" by Mark Mason
- "A man's search for meaning" by Viktor E. Frankl


<form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdvmlONHQfio8hRsNBBzXN_Y4vNvwghzMxmD7KEgDfhx9nqGg/formResponse" target="book_hidden_iframe">
    <div class="d-flex w-100">
        <div class="group" style="flex-grow:1;">
            <input class="textbox" id="book-name" name="entry.262159436" type="text" autocomplete="off" required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label id="book-label">Suggest a Book</label>
        </div>
        <div class="group">
        <input class="submitButton" type="submit" value="Submit">
        </div>
    </div>
</form>

<iframe name="music_hidden_iframe" id="music_hidden_iframe" style="display:none;"></iframe>
<iframe name="book_hidden_iframe" id="book_hidden_iframe" style="display:none;"></iframe>
<script>
let book = document.getElementById("book_hidden_iframe")
let music = document.getElementById("music_hidden_iframe")
music.addEventListener("load", function(){submit("music")}, true)
book.addEventListener("load", function(){submit("book")}, true)
function submit(form) {
    document.getElementById(form + "-label").innerText = "Suggest another " + (form == "book" ? "Book" : "Song/Album" )
    document.getElementById(form + "-name").value = ""
    showSnackbar("Submitted " + form)
}
</script>