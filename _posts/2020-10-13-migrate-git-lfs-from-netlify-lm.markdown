---
title: Migrate Git LFS files from Netlify Large Media to another LFS provider
number: 27
categories: Azure
---

## Problem:

If you want to fork or even clone a repository that is using [Netlify Large Media](https://docs.netlify.com/large-media/overview/){:target="_blank"} as it's [Git Large File Storage](https://git-lfs.github.com/) provider, the large files may not be available to you.

For example I want to process my some Netlify Large Media assets using gulp to standardise filetype and produce webp images.  I attempted to do this in [Azure DevOps](https://azure.microsoft.com/en-gb/services/devops/){:target="_blank"} and found Netlify's Large Media reluctant to share the binaries with a task runner.

It seems that you must be running the Netlify CLI and the Large Media plugin in order to access the files.  Therefore, you need to take steps to migrate your binaries to another provider on a system that has the tools installed and is authenticated with netlify.  From then on you may only need only git LFS.


## Solution:

Import or fork your old repository and clone this into your working environment. 

{% highlight bash %}
# Download all of the binaries from Netlify
git lfs fetch  --all origin
# Rename the pointer to Netlify's Service
mv .lfsconfig .lfsconfig_
# Push the binaries to your new repository
git lfs push  --all origin
# Optionally remove the unwanted .lfsconfig
rm .lfsconfig_
{% endhighlight %}

## Pitfalls:
- At time of writing Azure DevOps repositories seem to only support access for LFS over http and not ssh, the ````git lfs push```` command hung without error when I attempted over ssh.
- Each Git provider seems to have their own interpretation of LFS so please read their docs carefully and consider compatibility. For example the git based [CMS Forestry](https://forestry.io/docs/media/git/){:target="_blank"} do not support GitLab or Bitbucket LFS.