---
title: Amplify Build Errors (Jekyll Static Site)
number: 23
categories: AWS
redirect_from: /aws/AWSAmplify-build-failures
---

## Problem:
If you have been developing against up-to-date versions of Jekyll, Ruby or Bundle, you may get some version issues when you first add a site to AWS Amplify.

    2020-09-11T17:36:19.251Z [WARNING]: Warning: the running version of Bundler (2.0.1) is older than the version that created the lockfile (2.1.4). We suggest you upgrade to the latest version of Bundler by running `gem install bundler`.
    ...
    2020-09-11T17:36:20.691Z [WARNING]: activesupport-6.0.3.3 requires ruby version >= 2.5.0, which is incompatible with
                                    the current version, ruby 2.4.6p354
    2020-09-11T17:36:20.740Z [ERROR]: !!! Build failed
    2020-09-11T17:36:20.740Z [ERROR]: !!! Non-Zero Exit Code detected
    2020-09-11T17:36:20.740Z [INFO]: # Starting environment caching...
    2020-09-11T17:36:20.741Z [INFO]: # Environment caching completed

## Solution:

You have a few options:

If you need features that the newer versions offer you can force particular versions with [Custom Build Images or Live Package Updates](https://docs.aws.amazon.com/amplify/latest/userguide/custom-build-image.html){:target="_blank"} 

Alternatively, you can set your local dependencies to match the build server.  This would ideally be achieved with a docker image.  However, I haven't seen a link to the images Amplify uses.  Please link in the comments if you find them.  I like how [GitHub Pages](https://pages.github.com/){:target="_blank"}  make it easy for you to match development and build environments with a github-pages gem file.

In my case I replicated the build server with the following commands.

    rbenv install 2.4.6
    rbenv local 2.4.6
    gem install bundler -v 2.0.1

If you choose this method, you'll probably have to customise to match versions to the errors in your log.  And if you're using a node based build you'll have to do something similar with npm and yarn.

N.B. I'll not cover installation of rbnev in this trial here is a link to their [source/documentation](https://github.com/rbenv/rbenv){:target="_blank"} . [RVM](https://rvm.io/){:target="_blank"}  does a similar job.