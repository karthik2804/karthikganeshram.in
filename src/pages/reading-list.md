---
layout: genericPage.njk
title: Reading list
permalink: /reading-list/
---

I am starting to cultivate a habit of reading regularly to expand my views. I love reading but tend to get distracted. Hopefully maintaining an online record will improve my reading habit.

So here are the list of books I am reading currently along with the books I have completed. Finally there is a list of books I wish to read. Feel free to suggest books at the end of the page.

### Currently Reading
| Title | Author|
--------|---------
| Everything is f*cked | Mark Manson

### Finished Reading

| Title | Author| Finished 
--------|---------|----|
| The subtle art of not giving a f*ck | Mark Manson | April 2021 |
| The monk who sold his ferrari | Robin Sharma | May 2021 |
| Ikigai | Francesc Miralles and Hector Garcia | May 2021 |

### Would Like to read

|Title|Author
---|---
A man's search for meaning| Viktor E. Frankl
Making Sense | Sam Harris
A history of western Philosophy | Betrand Russell

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


<iframe name="book_hidden_iframe" id="book_hidden_iframe" style="display:none;"></iframe>
<script>
let book = document.getElementById("book_hidden_iframe")
book.addEventListener("load", function(){submit("book")}, true)
function submit(form) {
    document.getElementById("book-label").innerText = "Suggest another Book"
    document.getElementById(form + "-name").value = ""
}
</script>