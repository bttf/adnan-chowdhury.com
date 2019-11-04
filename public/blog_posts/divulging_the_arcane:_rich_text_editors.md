In an attempt to write a [screenwriting web-app](#), I have inevitably crossed into territory that has been unexplored in my career so far. That territory belongs to a land beyond simple `input` or `textarea` elements. These are no simple user inputs; these are powerful inputs equipped with styling and formatting options. They are **Rich Text Editors** and they are everywhere.  Yet, it seems there is not much out on the web describing exactly how they are built. But do not fret, this article will record my experience in trying to divulge and demystify the cryptic and arcane, by reverse-engineering a rich text editor.

###Take **designMode**, and **contentEditable**; may they serve you well
The capability of manipulating text in your browser including its styling and formatting is chiefly owed to the above web properties. DesignMode and contentEditable both originated from Microsoft's Internet Explorer 5.5 <sup>[[1]](#1)</sup> and both are similar in that they allow you to edit the contents of a web page in your browser. 

The difference between them is that **designMode** allows the entire HTML document to be editable. **ContentEditable** only makes a certain element (and its children) editable. DesignMode is a property of the `document` object, meaning that it is a document-wide setting (it is enabled by setting to it `"on"`). This is opposed to **contentEditable**, which is available as a property to *any* HTML element, and when enabled (by setting it to `"true"`), only the said element and its children are affected.

Being able to edit the content of an HTML document or element is necessary for building a rich text editor, to say the least. But what about being able to style and format the content? The user has to be able to click a button and voila - the selected text is **bold**, or *italic*, without any clumsy HTML tags. How is this sorcery possible?

###It is dangerous to go alone, take **execCommand** with you
`document.execCommand` is a method that allows you to specify a 'command' to execute on an editable document. If you are using `designMode` it will affect the entire document; if you are using `contentEditable` it will only affect the currently active editable element. There is a [full list of commands](https://developer.mozilla.org/en-US/docs/Web/API/document.execCommand) on MDN including familiar ones like bold, italicize and underline, which will modify selected text or apply to any new text.

Being able to modify an HTML document is important to enabling our rich text editors, and the **execCommand** method provides the meat and potatoes of this functionality. One note of advice is that cross-browser compatibility is more-or-less pretty good for common commands such as bold, italicize, underline, indent, paragraph, etc. But outside of that, cross-browser compatibility can get a little hairy<sup>[2]</sup>.

###Dismantling a (well built) Rich Text Editor from MDN

There is a good article on rich-text editors on MDN called [Rich-Text Editing in Mozilla](https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla). I gave it a read and found a small, inconspicuous link near the bottom of the page that read:
>*Note: if you want to see how to standardize the creation and the insertion of your editor in your page, please see our [more complete rich-text editor example](https://developer.mozilla.org/@api/deki/files/6243/=rich-text-editor.zip).*

I gave it a try and although it wasn't much for looks, the code was downright impressive; compact and built for efficiency. The code boasted flourishes such as flags being set with Bitwise OR's, [for loops without a loop-body](https://medium.com/@jtpaasch/for-loops-without-bodies-8bc36a7234a3) and nested ternary operators. Perhaps these gains in efficiency may decrease code readability so much that it may come off as contrived, but still I always find it interesting to learn new ways to do things in a language you know or are learning. So let's dive in.

There are four files in the package (save for the icons directory, which is just a collection of images):
```
.
├── icons
├── rich-text-editor.css
├── rich-text-editor.js
├── rich-text-editor_example.html
└── rich-text-tools.json
```
####rich-text-editor_example.html
The JavaScript and CSS will effectively be manipulating elements found on this page so it makes sense for us to start here. There is not much code on the page; only 30+ lines. We can see that the JS and CSS files are included in the head section, and not much more than that. In the body, we can see there are a few labels and text inputs for a person's name and e-mail. What is important is the **textarea** in the body, with the class **rich-text-editor**.
```
<textarea name="comment" id="newcomment" class="rich-text-editor"></textarea><br />
```
This is probably the only element we need to be concerned with. It seems like <s>most</s> all of the work will be done by JS and CSS.

####rich-text-editor.css
Other than some standard, run-of-the-mill CSS, I don't see anything noteworthy in here.

####rich-text-editor.js
Here we go.

For the uninitiated, you will notice that all of the code in rich-text-editor.js is wrapped in an self-executing function. If you are not familiar with this practice, look it up. (I don't have a link handy at the moment.) Your global namespace and future self will thank you.

The code starts with about a dozen function declarations. Then we see the actual body of code that gets executed first, and then the entry point located at the very bottom, with a funky nested ternary operator:

```
var oTools, nReady = 0, sModeLabel = "Show HTML", aEditors = [], rId = /\d+$/, oToolsReq = new XMLHttpRequest(),
customCommands = {
  "printDoc": function (oDoc) {
    if (!validateMode(oDoc)) { return; }
    var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    oPrntWin.document.open();
    oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
    oPrntWin.document.close();
  },
  "cleanDoc": function (oDoc) {
    if (validateMode(oDoc) && confirm("Are you sure?")) { oDoc.innerHTML = ""; };
  },
  "createLink": function (oDoc) {
    var sLnk = prompt("Write the URL here", "http:\/\/");
    if (sLnk && sLnk !== "http://"){ formatDoc(oDoc, "createlink", sLnk); }
  }
};

oToolsReq.onload = toolsReady;
oToolsReq.open("GET", "rich-text-tools.json", true);
oToolsReq.send(null);

window.addEventListener ? addEventListener("load", documentReady, false) : window.attachEvent ? attachEvent("onload", documentReady) : window.onload = documentReady;
```
The last line says: *Is window.addEventListener valid? If so, addEventListener( ... ), if not, is window.attachEvent valid? If it is, attachEvent( ... ), if not then just do window.onload = documentReady*. We can see in each statement that we want to attach the method `documentReady` to the page's load/onload event.

So basically we can understand that **documentReady** is the first function to execute.

The function `documentReady` has only one call, and that is to another function `replaceFields` with the argument of 1
```
function replaceFields (nFlag) {
  nReady |= nFlag;
  if (nReady !== 3) { return; }
  for (
    var oField, nItem = 0, aTextareas = Array.prototype.slice.call(document.getElementsByTagName("textarea"), 0);
      nItem < aTextareas.length;
    oField = aTextareas[nItem++], oField.className !== "rich-text-editor" || createEditor(oField)
  );
}
```

The `|=` operator you see is a compound operator; it basically means `nReady = nReady | nFlag`. This a Bitwise OR between nReady and nFlag. We know nFlag to be 1. But nReady? Back in the body of the closure, you'll find the var declaration for nReady, and that it is set to 0. So this statement effectively sets nReady to 1. 

The next statement is an `if` whose condition we do satisfy, thus, under the current circumstances, we return out of the function.

So that's it. That's the whole script. But there has to be more. We must have missed a flow of execution from the beginning. Let's look again at the body of the closure:
```
var oToolsReq = new XMLHttpRequest()
...
oToolsReq.onload = toolsReady;
oToolsReq.open("GET", "rich-text-tools.json", true);
oToolsReq.send(null);

window.addEventListener ? addEventListener("load", documentReady, false) : window.attachEvent ? attachEvent("onload", documentReady) : window.onload = documentReady;
```
We can see that `oToolsReq` is an XHR object, with an onload function set to `toolsReady`. This means that once it loads a response from its AJAX request, it will execute `toolsReady`. Well, let's assume that it does this successfully, and calls `toolsReady`.
```javascript
function toolsReady () {
  oTools = JSON.parse(this.responseText);
  replaceFields(2);
}
```
`toolsReady` parses the response and puts it into the `oTools` variable. Then it calls `replaceFields` with a parameter of 2. We know that our previous call to replaceFields set nReady to 1. So now we are doing a bitwise OR between 1 and 2 (1 | 2) which equals 3. Since nReady now equals 3, `replaceFIelds` will not exit on the `if` statement anymore, and will proceed into the for loop.
```
for (
  var oField, nItem = 0, aTextareas = Array.prototype.slice.call(document.getElementsByTagName("textarea"), 0);
    nItem < aTextareas.length;
  oField = aTextareas[nItem++], oField.className !== "rich-text-editor" || createEditor(oField)
);
```
In the initialization block, we declare `oField`, set `nItem` to 0, and set `aTextareas` to all textareas on the page (the `slice` call cleverly casts it into an Array).

Our condition statement is `nItem` is less than the number of textareas on the page.

Our do-after-each-iteration, or increment statement is setting `oField` to a textarea, and then executing an inline OR stating that oField's className, or rather the class name of the textarea that oField is currently set to, is not equal to 'rich-text-editor'. If it **is** equal to 'rich-text-editor', the right-hand-side of the OR will be executed.

**TL;DR** This loop will iterate through all the textareas on the page, find the one that has 'rich-text-editor' as its class, and then pass it to the method `createEditor` with the textarea as its argument.

#####createEditor()
At the start of the function there are a variety of var declarations. Of note we can see `nEditorId` being set to the length of `aEditors`. `aEditors` is initialized as an empty array, so we can safely assume that at this point `nEditorId` is equal to 0. The remaining var declarations are various div, input and label elements that will be appended to the HTML document. We have one argument passed in, and that is `oTxtArea`, which is our textarea with class 'rich-text-editor'.

Next we see the `className` and `id` properties getting assigned for the HTML elements we've created. Of note we can see that `oEditBox` has its `contentEditable` property set to true. This is a clear indicator that `oEditBox` will be the editable portion of our rich-text-editor. It is also pushed onto the `aEditors` array.

Next there is an `if` statement, checking to see if `oTxtArea` (the textarea that was passed in) belongs to a form element. If it does, create a hidden input element with the same name and value as `oTxtArea`, but with a unique id (`'rte-field-' + nEditorId`) and append it to the same form that `oTxtArea` belongs to. Interesting that the `onblur` event for `oEditBox` is set to method `updateField`.

#####updateField()
```
function updateField () {
  var sFieldNum = rId.exec(this.id)[0];
  document.getElementById("rte-field-" + sFieldNum).value = document.getElementById("rte-mode-" + sFieldNum).checked ? extractText(this) : this.innerHTML;
}
```
`rId` is a regex string, so the`exec` method basically filters `this.id` and sets it to `sFieldNum`. Looking at `rId`, we can see that it only matches one or more digits.

The next line sets the value of the element found via the id to either the output of `extractText(this)` or `this.innerHTML`, depending on whether or not an element with id `rte-mode-##` is checked. I think this is far enough down the rabbit hole for now, let's return back to createEditor for now, and come back later if we need to.

---
#####createEditor()
After the `if` statement is a `for` loop. This one has a loop body for a change. It initializes several vars without assigning them execpt for one; `nMenu` to 0. The conditional block states `nMenu < oTools.menus.length`. What is this `oTools` and where did it come from? If you'll remember a method we looked at called `toolsReady`, you'll see that oTools is set to the output of a `JSON.parse` call of the response text from the XHR we made in the beginning. That XHR was basically requesting the file **rich-text-tools.json** which is in the same directory as the HTML, CSS and JS files.

After looking at the json file, we can see that the menus property is set to an array, which by glancing at it looks to be about a length of 5 or so.

So basically this `for` loop will iterate through the  menus listed in **rich-text-tools.json** and create `select` elements for each menu in the menus array. This corresponds with the UI of the rich-text editor, shown below:

<img src="img/richTextEditor_selectElements.png" class="img-responsive">

Moving on, we see another `for` loop executing a similar patterns with the `buttons` array of the `oTools` object.

Next we see a chunk of code dedicated to configuring the checkbox and its accompanying label. Its `onchange` event is attached to the `changeMode` method which we can assume changes a mode.

Then we append these newly configured HTML elements to `oParent`. **Most importantly**, we see:
```
oTxtArea.parentNode.replaceChild(oParent, oTxtArea);
```
So in the final lines of execution, we see that our original textarea is **replaced** by a brand new textarea, fully-configured and `contentEditable`. And thus, `createEditor()` finishes execution.

####Re-cap
So far, we have divulged the initialization process. It creates a textarea with the `contenteditable` property set to true, and then create an array of menus and buttons that alter the content of this textarea. Let's take a look at how some of these select menus and buttons change the style and formatting of our textarea's content.

####Buttons
Here's an excerpt of some of the buttons in **rich-text-tools.json**:
```
...
                }, {
                        "text": "Undo",
                        "command": "undo",
                        "image": "icons\/undo.gif"
                }, {
                        "text": "Redo",
                        "command": "redo",
                        "image": "icons\/redo.gif"
                }, {
                        "text": "Remove formatting",
                        "command": "removeFormat",
                        "image": "icons\/format.png"
                }, {
...
```
We can see that each button has a `text` property, which we can safely assume is its outward label. The `command` property is what we are more interested in: it is the actual command that is passed to **execCommand**. `image` refers to the path of the image rendered for the button.

Let's try and find the code where a button's `command` property is passed to `execCommand`.

In **rich-text-editor.js**, we can see in the `createEditor` method, that each button is initialized with the `buttonClick` method as its `onclick` handler. Also of note is the button `id`: it is set to the command that the button is assigned and appended with `nEditorId`. `nEditorId` seems to keeps all menu items, buttons, and editors grouped with the same numerical id. This will be important later.

```
        ...
        oButton.id = oBtnDef.command + nEditorId;
        oButton.src = oBtnDef.image;
        if (oBtnDef.hasOwnProperty("value")) { oButton.alt = oBtnDef.value; }
        oButton.title = oBtnDef.text;
        oButton.onclick = buttonClick;
        oToolsBar.appendChild(oButton);
}

```
So let's check out buttonClick:
```
function buttonClick () {
  var sBtnGroup = rId.exec(this.id)[0], sCmd = this.id.slice(0, - sBtnGroup.length);
  customCommands.hasOwnProperty(sCmd) ? customCommands[sCmd](aEditors[sBtnGroup]) : formatDoc(aEditors[sBtnGroup], sCmd, this.alt || false);
}
```
The first thing that buttonClick does is parse the digits out from the buttons `id` property, and save it into `sBtnGroup`. Semantically, this refers to the 'group' that the buttons, select menus and textarea all belong to. `sCmd` is set to the part of the `id` minus the numerical id, i.e. its command. 

The next line invokes `hasOwnProperty` on the `customCommands` object (this is a protypical method on all JavaScript objects). `customCommands` is initiated earlier in the code as you'll see here:

```
...
customCommands = {
  "printDoc": function (oDoc) {
    if (!validateMode(oDoc)) { return; }
    var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    oPrntWin.document.open();
    oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
    oPrntWin.document.close();
  },
  "cleanDoc": function (oDoc) {
    if (validateMode(oDoc) && confirm("Are you sure?")) { oDoc.innerHTML = ""; };
  },
  "createLink": function (oDoc) {
    var sLnk = prompt("Write the URL here", "http:\/\/");
    if (sLnk && sLnk !== "http://"){ formatDoc(oDoc, "createlink", sLnk); }
  }
};

```
We can see here that `customCommands` consists of three keys, each corresponding with a command that requires some form of extraneous input or output, e.g. `printDoc` will open a new HTML document and run `print()` when loaded, `cleanDoc` asks for confirmation and then wipes the `innerHTML` of `oDoc` (which we can safely assume refers to the textarea), and `createLink` prompts the user for a URL to create an anchor link.

For the sake of simplicity and understanding the common workflow, let's go back to `buttonClick` and track the execution flow of `hasOwnProperty` returning false. This would imply that we have a command that does not fall under one of the 'customCommands'. 

```
function buttonClick () {
  var sBtnGroup = rId.exec(this.id)[0], sCmd = this.id.slice(0, - sBtnGroup.length);
  customCommands.hasOwnProperty(sCmd) ? customCommands[sCmd](aEditors[sBtnGroup]) : formatDoc(aEditors[sBtnGroup], sCmd, this.alt || false);
}
```
Returning false would lead the conditional to execute `formatDoc`, with `aEditors[sBtnGroup]` as its 1st argument, `sCmd`, which contains our command, as the 2nd argument, and either `this.alt` or `false` as the third. Let's look at `formatDoc`.

```
function formatDoc (oDoc, sCmd, sValue) {
  if (!validateMode(oDoc)) { return; }
  document.execCommand(sCmd, false, sValue);
  oDoc.focus();
}

```
The first thing `formatDoc` does is call `validateMode` with `oDoc` as an argument. Remember that `oDoc` is `aEditors[sBtnGroup]`, which is equal to the `oEditBox` that we pushed onto the `aEditors` array way back in`createEditor()`.

`validateMode` basically does one thing, and that is to check if the 'Show HTML' checkbox is **checked**. If it is checked, then `validateMode` will alert the user to uncheck the box and return `false`. If 'Show HTML' is not checked, then validateMode will return `true`, thereby failing the conditional and moving on to `execCommand`.

`execCommand` is (finally) called, with `sCmd` referring to the command to be executed. The other 2 parameters are less important; the 2nd parameter refers to a 'showDefaultUI' setting which is hardly ever used, and the third parameter refers to any input required by the command in order to complete its execution. Most commands consist of a simple toggle though, in which case `null` or `false` will do just fine.

###Conclusion
We have mapped our the basic execution flow for creating `contentEditable` enabled textareas and executing styling and formatting commands on them using `execCommand` with the MDN rich-text-editor example. It is a hunky piece of code that is quite robust and very efficient. One thing that I found impressive was that I could add multiple textareas to the HTML page with the class 'rich-text-editor', and the JavaScript would automatically scale-up and decorate each textarea accordingly with menus and buttons and allow each one to be fully editable. Nothing short of impressive. And exhausting!

---
[1, 2] [The WHATWG Blog — The Road to HTML 5: contentEditable](https://blog.whatwg.org/the-road-to-html-5-contenteditable)
