## Code Review Exercise

### Issue #1: The form buttons are outside the form
The submit and reset buttons are placed outside of the <form> element. Because of this, the buttons are not actually connected to the form. Clicking the submit button may not submit the form correctly, and the reset button may not clear the form fields like the user expects. To fix this issue, I would move the submit and reset buttons inside the <form> element.

**Current code:**

```html
</form>
<div class="form space-evenly-distributed-row-container form-buttons-container">
  <input class="form-button" type="submit" value="submit" />
  <input class="form-button" type="reset" value="reset" />
</div>
```

**Updated code:**

```html
<div class="space-evenly-distributed-row-container form-buttons-container">
  <input class="form-button" type="submit" value="submit" />
  <input class="form-button" type="reset" value="reset" />
</div>
</form>
```

### Issue #2: Some inputs use spans instead of real labels
Some of the form inputs use <span> elements as visual labels instead of real <label> elements. <span> does not actually connect the label text to the input field, which means users cannot click the label text to focus the input. To fix this issue, I would replace the <span> with a <label> and connect it to the input using the "for" attribute.

**Current code:**

```html
<span class="form-label">Name</span>
<input
  aria-label="name"
  class="form-input-box"
  type="text"
  id="name"
  name="name"
/>
```

**Updated code:**

```html
<label class="form-label" for="name">Name</label>
<input
  class="form-input-box"
  type="text"
  id="name"
  name="name"
/>
```

### Issue #3: “More Info” and “Load New Cat Facts” should be buttons
I noticed that the “More Info” and “Load New Cat Facts” controls are written as <a> tags, but they do not have an "href" attribute. They trigger JavaScript actions instead of navigating to another page. Because links should be used for navigation, using an <a> tag without href is not as accessible. To fix this issue, I would change these elements into real <button> elements.

**Current code:**

```html
<a class="more-info-button">More Info</a>
<a class="reload-cat-facts">Load New Cats Facts</a>
```

**Updated code:**

```html
<button class="more-info-button" type="button">More Info</button>
<button class="reload-cat-facts" type="button">Load New Cat Facts</button>
```

### Issue #4: Checkbox group should use <fieldset> and <legend>

The list of cat breeds is a group of related checkboxes, but the question text is placed inside a <p> element instead of <legend>. Because screen readers rely on <fieldset> and <legend> to understand that multiple checkboxes belong to the same question. Visually, the group makes sense, but the HTML structure is not optimal for accessibility. To fix this issue, I would wrap the checkbox group in a <fieldset> and use a <legend> for the question.

**Current code:**

```html
<div class="form-fieldset form-element-container">
  <p class="form-label">What breeds would you like to learn?</p>

  <div>
    <input type="checkbox" id="siamese" name="breed1" value="siamese" />
    <label for="siamese">Siamese Cat</label>
  </div>

  ...
</div>
```

**Updated code:**

```html
<fieldset class="form-fieldset form-element-container">
  <legend class="form-label">
    What breeds would you like to learn?
  </legend>

  <div>
    <input type="checkbox" id="siamese" name="breed1" value="siamese" />
    <label for="siamese">Siamese Cat</label>
  </div>

  ...
</fieldset>
```

### Issue #5: The close popup buttons are missing labels

Some close popup buttons only contain an icon and do not have an accessible label. This is an accessibility issue because screen readers may not know what the button is supposed to do. Screen readers needs text like "aria-label" to describe the purpose of the button. To fix this, I would add an "aria-label" and a "title" to the close button.

**Current code:**

```html
<button class="close-popup-button">
  <i class="fa-solid fa-xmark"></i>
</button>
```

**Updated code:**

```html
<button
  class="close-popup-button"
  aria-label="close popup window"
  title="close popup window"
>
  <i class="fa-solid fa-xmark"></i>
</button>
```
