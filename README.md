This is the repo for Crafteria.it.

It is built on top of Telescope an open-source, real-time social news site built with [Meteor](http://meteor.com).

Note that Telescope is distributed under the [MIT License](http://opensource.org/licenses/MIT)

Get started by cloning this repo with:

`git clone https://github.com/jamnab/Crafteria-webapp.git`

### Editing the About Page

First navigate to the file about_page.html. You can find this under:

```
packages/telescope-static-pages/lib/client/templates
```

From there you can edit the template by adding tags for specific uses:

* `<h2></h2>` tags for headers.
* `<h3></h3>` tags for sub-headers.
* `<p></p>` tags for text.
* `<a></a>` tags for links.
* `<img src="">` tags for images where src is the link to the image.

To edit the navigation link for the about page just open the about_link.html page in the same folder as the about_page.html.
In that template is an `<a>` tag with the about title on it. Changing this will change the navigation label for the about page.

### Saving Changes

To save your changes you'll need to install meteor and deploy those changes.

Install meteor on your Mac with:

`curl https://install.meteor.com/ | sh`

Deploy your changes to the site with

`sudo meteor deploy crafteria.it`

Finally make sure that your ip address is pointing to the meteor site @ 107.22.210.133.

Your changes should show up in a minute or two if everything has gone correctly.
