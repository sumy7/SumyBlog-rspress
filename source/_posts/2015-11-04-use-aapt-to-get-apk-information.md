---
layout: post
title: 使用aapt获取apk的基本信息
date: '2015-11-04 20:08:18'
categories:
  - 工具
tags:
  - android
  - aapt
  - apk
---

# 使用aapt获取apk的基本信息

`aapt`全称是android assert packaging tool。在编写android程序的时候，IDE会使用这个工具将程序资源打包成apk文件。
前几天有获取apk包图标的需求，几番求证发现可以使用这个工具得到icon资源在apk包中的路径，通过处理aapt的输出，进而可以获取到图标。
这里只简单记录一下aapt获取apk基本信息的方法，对于打包方法不做介绍了。

## 它在哪里

如果你有安装android的sdk工具包，那么就可以在sdk目录下`$ANDROID_HOME/build-tools/$SDK`目录下找到它（$SDK为sdk的版本）。

## 命令行

```bash
$ aapt.exe
Android Asset Packaging Tool

Usage:
 aapt l[ist] [-v] [-a] file.{zip,jar,apk}
   List contents of Zip-compatible archive.

 aapt d[ump] [--values] [--include-meta-data] WHAT file.{apk} [asset [asset ...]]
   strings          Print the contents of the resource table string pool in the APK.
   badging          Print the label and icon for the app declared in APK.
   permissions      Print the permissions from the APK.
   resources        Print the resource table from the APK.
   configurations   Print the configurations in the APK.
   xmltree          Print the compiled xmls in the given assets.
   xmlstrings       Print the strings of the given compiled xml assets.

 aapt p[ackage] [-d][-f][-m][-u][-v][-x][-z][-M AndroidManifest.xml] \
        [-0 extension [-0 extension ...]] [-g tolerance] [-j jarfile] \
        [--debug-mode] [--min-sdk-version VAL] [--target-sdk-version VAL] \
        [--app-version VAL] [--app-version-name TEXT] [--custom-package VAL] \
        [--rename-manifest-package PACKAGE] \
        [--rename-instrumentation-target-package PACKAGE] \
        [--utf16] [--auto-add-overlay] \
        [--max-res-version VAL] \
        [-I base-package [-I base-package ...]] \
        [-A asset-source-dir]  [-G class-list-file] [-P public-definitions-file] \
        [-S resource-sources [-S resource-sources ...]] \
        [-F apk-file] [-J R-file-dir] \
        [--product product1,product2,...] \
        [-c CONFIGS] [--preferred-density DENSITY] \
        [--split CONFIGS [--split CONFIGS]] \
        [--feature-of package [--feature-after package]] \
        [raw-files-dir [raw-files-dir] ...] \
        [--output-text-symbols DIR]

   Package the android resources.  It will read assets and resources that are
   supplied with the -M -A -S or raw-files-dir arguments.  The -J -P -F and -R
   options control which files are output.

 aapt r[emove] [-v] file.{zip,jar,apk} file1 [file2 ...]
   Delete specified files from Zip-compatible archive.

 aapt a[dd] [-v] file.{zip,jar,apk} file1 [file2 ...]
   Add specified files to Zip-compatible archive.

 aapt c[runch] [-v] -S resource-sources ... -C output-folder ...
   Do PNG preprocessing on one or several resource folders
   and store the results in the output folder.

 aapt s[ingleCrunch] [-v] -i input-file -o outputfile
   Do PNG preprocessing on a single file.

 aapt v[ersion]
   Print program version.

 Modifiers:
   -a  print Android-specific data (resources, manifest) when listing
   -c  specify which configurations to include.  The default is all
       configurations.  The value of the parameter should be a comma
       separated list of configuration values.  Locales should be specified
       as either a language or language-region pair.  Some examples:
            en
            port,en
            port,land,en_US
   -d  one or more device assets to include, separated by commas
   -f  force overwrite of existing files
   -g  specify a pixel tolerance to force images to grayscale, default 0
   -j  specify a jar or zip file containing classes to include
   -k  junk path of file(s) added
   -m  make package directories under location specified by -J
   -u  update existing packages (add new, replace older, remove deleted files)
   -v  verbose output
   -x  create extending (non-application) resource IDs
   -z  require localization of resource attributes marked with
       localization="suggested"
   -A  additional directory in which to find raw asset files
   -G  A file to output proguard options into.
   -F  specify the apk file to output
   -I  add an existing package to base include set
   -J  specify where to output R.java resource constant definitions
   -M  specify full path to AndroidManifest.xml to include in zip
   -P  specify where to output public resource definitions
   -S  directory in which to find resources.  Multiple directories will be scanned
       and the first match found (left to right) will take precedence.
   -0  specifies an additional extension for which such files will not
       be stored compressed in the .apk.  An empty string means to not
       compress any files at all.
   --debug-mode
       inserts android:debuggable="true" in to the application node of the
       manifest, making the application debuggable even on production devices.
   --include-meta-data
       when used with "dump badging" also includes meta-data tags.
   --pseudo-localize
       generate resources for pseudo-locales (en-XA and ar-XB).
   --min-sdk-version
       inserts android:minSdkVersion in to manifest.  If the version is 7 or
       higher, the default encoding for resources will be in UTF-8.
   --target-sdk-version
       inserts android:targetSdkVersion in to manifest.
   --max-res-version
       ignores versioned resource directories above the given value.
   --values
       when used with "dump resources" also includes resource values.
   --version-code
       inserts android:versionCode in to manifest.
   --version-name
       inserts android:versionName in to manifest.
   --replace-version
       If --version-code and/or --version-name are specified, these
       values will replace any value already in the manifest. By
       default, nothing is changed if the manifest already defines
       these attributes.
   --custom-package
       generates R.java into a different package.
   --extra-packages
       generate R.java for libraries. Separate libraries with ':'.
   --generate-dependencies
       generate dependency files in the same directories for R.java and resource package
   --auto-add-overlay
       Automatically add resources that are only in overlays.
   --preferred-density
       Specifies a preference for a particular density. Resources that do not
       match this density and have variants that are a closer match are removed.
   --split
       Builds a separate split APK for the configurations listed. This can
       be loaded alongside the base APK at runtime.
   --feature-of
       Builds a split APK that is a feature of the apk specified here. Resources
       in the base APK can be referenced from the the feature APK.
   --feature-after
       An app can have multiple Feature Split APKs which must be totally ordered.
       If --feature-of is specified, this flag specifies which Feature Split APK
       comes before this one. The first Feature Split APK should not define
       anything here.
   --rename-manifest-package
       Rewrite the manifest so that its package name is the package name
       given here.  Relative class names (for example .Foo) will be
       changed to absolute names with the old package so that the code
       does not need to change.
   --rename-instrumentation-target-package
       Rewrite the manifest so that all of its instrumentation
       components target the given package.  Useful when used in
       conjunction with --rename-manifest-package to fix tests against
       a package that has been renamed.
   --product
       Specifies which variant to choose for strings that have
       product variants
   --utf16
       changes default encoding for resources to UTF-16.  Only useful when API
       level is set to 7 or higher where the default encoding is UTF-8.
   --non-constant-id
       Make the resources ID non constant. This is required to make an R java class
       that does not contain the final value but is used to make reusable compiled
       libraries that need to access resources.
   --shared-lib
       Make a shared library resource package that can be loaded by an application
       at runtime to access the libraries resources. Implies --non-constant-id.
   --error-on-failed-insert
       Forces aapt to return an error if it fails to insert values into the manifest
       with --debug-mode, --min-sdk-version, --target-sdk-version --version-code
       and --version-name.
       Insertion typically fails if the manifest already defines the attribute.
   --error-on-missing-config-entry
       Forces aapt to return an error if it fails to find an entry for a configuration.
   --output-text-symbols
       Generates a text file containing the resource symbols of the R class in the
       specified folder.
   --ignore-assets
       Assets to be ignored. Default pattern is:
       !.svn:!.git:!.ds_store:!*.scc:.*:<dir>_*:!CVS:!thumbs.db:!picasa.ini:!*~
   --skip-symbols-without-default-localization
       Prevents symbols from being generated for strings that do not have a default
       localization
   --no-version-vectors
       Do not automatically generate versioned copies of vector XML resources.

```

## 获取信息

### list

```
aapt l[ist] [-v] [-a] file.{zip,jar,apk}
  List contents of Zip-compatible archive.
```

列出apk包的内容
这个功能与unzip差不多，因为apk本来就是一个zip压缩包。

```
$ ./aapt.exe l HelloAndroid.apk
res/layout/activity_hello.xml
res/menu/activity_hello.xml
AndroidManifest.xml
resources.arsc
res/drawable-hdpi/ic_launcher.png
res/drawable-ldpi/ic_launcher.png
res/drawable-mdpi/ic_launcher.png
res/drawable-xhdpi/ic_launcher.png
classes.dex
META-INF/MANIFEST.MF
META-INF/CERT.SF
META-INF/CERT.RSA
```

`-v` 选项会以table的形式显示apk内容。

```bash
$ ./aapt.exe l -v HelloAndroid.apk
Archive:  HelloAndroid.apk
 Length   Method    Size  Ratio   Offset      Date  Time  CRC-32    Name
--------  ------  ------- -----  -------      ----  ----  ------    ----
    1996  Deflate     526  74%         0  07-22-13 15:50  a898c6d2  res/layout/activity_hello.xml
     564  Deflate     271  52%       605  07-22-13 15:50  c40856cd  res/menu/activity_hello.xml
    2044  Deflate     716  65%       949  07-22-13 15:50  37126314  AndroidManifest.xml
    3108  Stored     3108   0%      1730  07-22-13 15:42  8d8e16bc  resources.arsc
    1002  Stored     1002   0%      4884  07-22-13 15:13  754d52e5  res/drawable-hdpi/ic_launcher.png
     642  Stored      642   0%      5950  07-22-13 15:13  1fb6ebab  res/drawable-ldpi/ic_launcher.png
     814  Stored      814   0%      6658  07-22-13 15:13  fb9e58b2  res/drawable-mdpi/ic_launcher.png
    1288  Stored     1288   0%      7538  07-22-13 15:13  f79f597a  res/drawable-xhdpi/ic_launcher.png
    8172  Deflate    3755  54%      8892  07-22-13 15:50  494df7f6  classes.dex
     762  Deflate     401  47%     12704  07-22-13 15:50  19372b52  META-INF/MANIFEST.MF
     815  Deflate     431  47%     13171  07-22-13 15:50  7a7315f9  META-INF/CERT.SF
     776  Deflate     606  22%     13664  07-22-13 15:50  b5d01da6  META-INF/CERT.RSA
--------          -------  ---                            -------
   21983            13560  38%                            12 files
```

`-a`会详细显示apk的内容，不仅会显示包内文件，还会显示xml树和AndroidManifest.xml的内容。
这个参数与这三个命令的集合`aapt list <pkg> ; aapt dump resources <pkg> ; aapt dump xmltree <pkg> AndroidManifest.xml`执行的效果相同。

```bash
$ ./aapt.exe l -a HelloAndroid.apk
res/layout/activity_hello.xml
res/menu/activity_hello.xml
AndroidManifest.xml
resources.arsc
res/drawable-hdpi/ic_launcher.png
res/drawable-ldpi/ic_launcher.png
res/drawable-mdpi/ic_launcher.png
res/drawable-xhdpi/ic_launcher.png
classes.dex
META-INF/MANIFEST.MF
META-INF/CERT.SF
META-INF/CERT.RSA

Resource table:
Package Groups (1)
Package Group 0 id=0x7f packageCount=1 name=com.example.hello
  Package 0 id=0x7f name=com.example.hello
    type 1 configCount=4 entryCount=1
      spec resource 0x7f020000 com.example.hello:drawable/ic_launcher: flags=0x00000100
      config ldpi-v4:
        resource 0x7f020000 com.example.hello:drawable/ic_launcher: t=0x03 d=0x00000002 (s=0x0008 r=0x00)
      config mdpi-v4:
        resource 0x7f020000 com.example.hello:drawable/ic_launcher: t=0x03 d=0x00000003 (s=0x0008 r=0x00)
      config hdpi-v4:
        resource 0x7f020000 com.example.hello:drawable/ic_launcher: t=0x03 d=0x00000004 (s=0x0008 r=0x00)
      config xhdpi-v4:
        resource 0x7f020000 com.example.hello:drawable/ic_launcher: t=0x03 d=0x00000005 (s=0x0008 r=0x00)
    type 2 configCount=1 entryCount=1
      spec resource 0x7f030000 com.example.hello:layout/activity_hello: flags=0x00000000
      config (default):
        resource 0x7f030000 com.example.hello:layout/activity_hello: t=0x03 d=0x00000000 (s=0x0008 r=0x00)
    type 3 configCount=1 entryCount=11
      spec resource 0x7f040000 com.example.hello:string/app_name: flags=0x00000000
      spec resource 0x7f040001 com.example.hello:string/menu_calc: flags=0x00000000
      spec resource 0x7f040002 com.example.hello:string/bmi_btn: flags=0x00000000
      spec resource 0x7f040003 com.example.hello:string/adds: flags=0x00000000
      spec resource 0x7f040004 com.example.hello:string/add1: flags=0x00000000
      spec resource 0x7f040005 com.example.hello:string/add2: flags=0x00000000
      spec resource 0x7f040006 com.example.hello:string/results: flags=0x00000000
      spec resource 0x7f040007 com.example.hello:string/zeronumber: flags=0x00000000
      spec resource 0x7f040008 com.example.hello:string/touchme: flags=0x00000000
      spec resource 0x7f040009 com.example.hello:string/text_broadcastContent: flags=0x00000000
      spec resource 0x7f04000a com.example.hello:string/text_sendBroadcast: flags=0x00000000
      config (default):
        resource 0x7f040000 com.example.hello:string/app_name: t=0x03 d=0x00000008 (s=0x0008 r=0x00)
        resource 0x7f040001 com.example.hello:string/menu_calc: t=0x03 d=0x00000007 (s=0x0008 r=0x00)
        resource 0x7f040002 com.example.hello:string/bmi_btn: t=0x03 d=0x00000007 (s=0x0008 r=0x00)
        resource 0x7f040003 com.example.hello:string/adds: t=0x03 d=0x00000006 (s=0x0008 r=0x00)
        resource 0x7f040004 com.example.hello:string/add1: t=0x03 d=0x0000000f (s=0x0008 r=0x00)
        resource 0x7f040005 com.example.hello:string/add2: t=0x03 d=0x00000009 (s=0x0008 r=0x00)
        resource 0x7f040006 com.example.hello:string/results: t=0x03 d=0x0000000a (s=0x0008 r=0x00)
        resource 0x7f040007 com.example.hello:string/zeronumber: t=0x03 d=0x0000000b (s=0x0008 r=0x00)
        resource 0x7f040008 com.example.hello:string/touchme: t=0x03 d=0x0000000c (s=0x0008 r=0x00)
        resource 0x7f040009 com.example.hello:string/text_broadcastContent: t=0x03 d=0x0000000d (s=0x0008 r=0x00)
        resource 0x7f04000a com.example.hello:string/text_sendBroadcast: t=0x03 d=0x0000000e (s=0x0008 r=0x00)
    type 4 configCount=3 entryCount=2
      spec resource 0x7f050000 com.example.hello:style/AppBaseTheme: flags=0x00000400
      spec resource 0x7f050001 com.example.hello:style/AppTheme: flags=0x00000000
      config (default):
        resource 0x7f050000 com.example.hello:style/AppBaseTheme: <bag>
        resource 0x7f050001 com.example.hello:style/AppTheme: <bag>
      config v11:
        resource 0x7f050000 com.example.hello:style/AppBaseTheme: <bag>
      config v14:
        resource 0x7f050000 com.example.hello:style/AppBaseTheme: <bag>
    type 5 configCount=1 entryCount=1
      spec resource 0x7f060000 com.example.hello:menu/activity_hello: flags=0x00000000
      config (default):
        resource 0x7f060000 com.example.hello:menu/activity_hello: t=0x03 d=0x00000001 (s=0x0008 r=0x00)
    type 6 configCount=1 entryCount=8
      spec resource 0x7f070000 com.example.hello:id/text_add1: flags=0x00000000
      spec resource 0x7f070001 com.example.hello:id/text_add2: flags=0x00000000
      spec resource 0x7f070002 com.example.hello:id/text_result: flags=0x00000000
      spec resource 0x7f070003 com.example.hello:id/submit: flags=0x00000000
      spec resource 0x7f070004 com.example.hello:id/test: flags=0x00000000
      spec resource 0x7f070005 com.example.hello:id/et_broadcastContent: flags=0x00000000
      spec resource 0x7f070006 com.example.hello:id/btn_sendBroadcast: flags=0x00000000
      spec resource 0x7f070007 com.example.hello:id/menu_calc: flags=0x00000000
      config (default):
        resource 0x7f070000 com.example.hello:id/text_add1: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070001 com.example.hello:id/text_add2: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070002 com.example.hello:id/text_result: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070003 com.example.hello:id/submit: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070004 com.example.hello:id/test: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070005 com.example.hello:id/et_broadcastContent: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070006 com.example.hello:id/btn_sendBroadcast: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070007 com.example.hello:id/menu_calc: t=0x12 d=0x00000000 (s=0x0008 r=0x00)

Android manifest:
N: android=http://schemas.android.com/apk/res/android
  E: manifest (line=2)
    A: android:versionCode(0x0101021b)=(type 0x10)0x1
    A: android:versionName(0x0101021c)="1.0" (Raw: "1.0")
    A: package="com.example.hello" (Raw: "com.example.hello")
    E: uses-sdk (line=7)
      A: android:minSdkVersion(0x0101020c)=(type 0x10)0x7
      A: android:targetSdkVersion(0x01010270)=(type 0x10)0x11
    E: application (line=11)
      A: android:theme(0x01010000)=@0x7f050001
      A: android:label(0x01010001)=@0x7f040000
      A: android:icon(0x01010002)=@0x7f020000
      A: android:debuggable(0x0101000f)=(type 0x12)0xffffffff
      A: android:allowBackup(0x01010280)=(type 0x12)0xffffffff
      E: activity (line=16)
        A: android:label(0x01010001)=@0x7f040000
        A: android:name(0x01010003)="com.example.hello.Hello" (Raw: "com.example.hello.Hello")
        E: intent-filter (line=19)
          E: action (line=20)
            A: android:name(0x01010003)="android.intent.action.MAIN" (Raw: "android.intent.action.MAIN")
          E: category (line=22)
            A: android:name(0x01010003)="android.intent.category.LAUNCHER" (Raw: "android.intent.category.LAUNCHER")
      E: receiver (line=25)
        A: android:name(0x01010003)=".HelloBroadcastReceiver" (Raw: ".HelloBroadcastReceiver")
        E: intent-filter (line=26)
          E: action (line=27)
            A: android:name(0x01010003)="com.example.hello.BroadcastReceiverTest" (Raw: "com.example.hello.BroadcastReceiverTest")
```

### dump

```
aapt d[ump] [--values] [--include-meta-data] WHAT file.{apk} [asset [asset ...]]
  strings          Print the contents of the resource table string pool in the APK.
  badging          Print the label and icon for the app declared in APK.
  permissions      Print the permissions from the APK.
  resources        Print the resource table from the APK.
  configurations   Print the configurations in the APK.
  xmltree          Print the compiled xmls in the given assets.
  xmlstrings       Print the strings of the given compiled xml assets.
```

查看apk包的信息
**badging** 会显示apk包声明的一些信息。

```bash
$ ./aapt.exe d badging HelloAndroid.apk
package: name='com.example.hello' versionCode='1' versionName='1.0' platformBuildVersionName=''
sdkVersion:'7'
targetSdkVersion:'17'
application-label:'加法计算器'
application-icon-120:'res/drawable-ldpi/ic_launcher.png'
application-icon-160:'res/drawable-mdpi/ic_launcher.png'
application-icon-240:'res/drawable-hdpi/ic_launcher.png'
application-icon-320:'res/drawable-xhdpi/ic_launcher.png'
application: label='加法计算器' icon='res/drawable-mdpi/ic_launcher.png'
application-debuggable
launchable-activity: name='com.example.hello.Hello'  label='加法计算器' icon=''
feature-group: label=''
  uses-feature: name='android.hardware.touchscreen'
  uses-implied-feature: name='android.hardware.touchscreen' reason='default feature for all apps'
main
other-receivers
supports-screens: 'small' 'normal' 'large' 'xlarge'
supports-any-density: 'true'
locales: '--_--'
densities: '120' '160' '240' '320'
```

**permissions** 打印apk申请的权限

```bash
$ ./aapt.exe d permissions HelloAndroid.apk
package: com.example.hello
```

**resources** 打印apk的资源表

```bash
$ ./aapt.exe d resources HelloAndroid.apk
Package Groups (1)
Package Group 0 id=0x7f packageCount=1 name=com.example.hello
  Package 0 id=0x7f name=com.example.hello
    type 1 configCount=4 entryCount=1
      spec resource 0x7f020000 com.example.hello:drawable/ic_launcher: flags=0x00000100
      config ldpi-v4:
        resource 0x7f020000 com.example.hello:drawable/ic_launcher: t=0x03 d=0x00000002 (s=0x0008 r=0x00)
      config mdpi-v4:
        resource 0x7f020000 com.example.hello:drawable/ic_launcher: t=0x03 d=0x00000003 (s=0x0008 r=0x00)
      config hdpi-v4:
        resource 0x7f020000 com.example.hello:drawable/ic_launcher: t=0x03 d=0x00000004 (s=0x0008 r=0x00)
      config xhdpi-v4:
        resource 0x7f020000 com.example.hello:drawable/ic_launcher: t=0x03 d=0x00000005 (s=0x0008 r=0x00)
    type 2 configCount=1 entryCount=1
      spec resource 0x7f030000 com.example.hello:layout/activity_hello: flags=0x00000000
      config (default):
        resource 0x7f030000 com.example.hello:layout/activity_hello: t=0x03 d=0x00000000 (s=0x0008 r=0x00)
    type 3 configCount=1 entryCount=11
      spec resource 0x7f040000 com.example.hello:string/app_name: flags=0x00000000
      spec resource 0x7f040001 com.example.hello:string/menu_calc: flags=0x00000000
      spec resource 0x7f040002 com.example.hello:string/bmi_btn: flags=0x00000000
      spec resource 0x7f040003 com.example.hello:string/adds: flags=0x00000000
      spec resource 0x7f040004 com.example.hello:string/add1: flags=0x00000000
      spec resource 0x7f040005 com.example.hello:string/add2: flags=0x00000000
      spec resource 0x7f040006 com.example.hello:string/results: flags=0x00000000
      spec resource 0x7f040007 com.example.hello:string/zeronumber: flags=0x00000000
      spec resource 0x7f040008 com.example.hello:string/touchme: flags=0x00000000
      spec resource 0x7f040009 com.example.hello:string/text_broadcastContent: flags=0x00000000
      spec resource 0x7f04000a com.example.hello:string/text_sendBroadcast: flags=0x00000000
      config (default):
        resource 0x7f040000 com.example.hello:string/app_name: t=0x03 d=0x00000008 (s=0x0008 r=0x00)
        resource 0x7f040001 com.example.hello:string/menu_calc: t=0x03 d=0x00000007 (s=0x0008 r=0x00)
        resource 0x7f040002 com.example.hello:string/bmi_btn: t=0x03 d=0x00000007 (s=0x0008 r=0x00)
        resource 0x7f040003 com.example.hello:string/adds: t=0x03 d=0x00000006 (s=0x0008 r=0x00)
        resource 0x7f040004 com.example.hello:string/add1: t=0x03 d=0x0000000f (s=0x0008 r=0x00)
        resource 0x7f040005 com.example.hello:string/add2: t=0x03 d=0x00000009 (s=0x0008 r=0x00)
        resource 0x7f040006 com.example.hello:string/results: t=0x03 d=0x0000000a (s=0x0008 r=0x00)
        resource 0x7f040007 com.example.hello:string/zeronumber: t=0x03 d=0x0000000b (s=0x0008 r=0x00)
        resource 0x7f040008 com.example.hello:string/touchme: t=0x03 d=0x0000000c (s=0x0008 r=0x00)
        resource 0x7f040009 com.example.hello:string/text_broadcastContent: t=0x03 d=0x0000000d (s=0x0008 r=0x00)
        resource 0x7f04000a com.example.hello:string/text_sendBroadcast: t=0x03 d=0x0000000e (s=0x0008 r=0x00)
    type 4 configCount=3 entryCount=2
      spec resource 0x7f050000 com.example.hello:style/AppBaseTheme: flags=0x00000400
      spec resource 0x7f050001 com.example.hello:style/AppTheme: flags=0x00000000
      config (default):
        resource 0x7f050000 com.example.hello:style/AppBaseTheme: <bag>
        resource 0x7f050001 com.example.hello:style/AppTheme: <bag>
      config v11:
        resource 0x7f050000 com.example.hello:style/AppBaseTheme: <bag>
      config v14:
        resource 0x7f050000 com.example.hello:style/AppBaseTheme: <bag>
    type 5 configCount=1 entryCount=1
      spec resource 0x7f060000 com.example.hello:menu/activity_hello: flags=0x00000000
      config (default):
        resource 0x7f060000 com.example.hello:menu/activity_hello: t=0x03 d=0x00000001 (s=0x0008 r=0x00)
    type 6 configCount=1 entryCount=8
      spec resource 0x7f070000 com.example.hello:id/text_add1: flags=0x00000000
      spec resource 0x7f070001 com.example.hello:id/text_add2: flags=0x00000000
      spec resource 0x7f070002 com.example.hello:id/text_result: flags=0x00000000
      spec resource 0x7f070003 com.example.hello:id/submit: flags=0x00000000
      spec resource 0x7f070004 com.example.hello:id/test: flags=0x00000000
      spec resource 0x7f070005 com.example.hello:id/et_broadcastContent: flags=0x00000000
      spec resource 0x7f070006 com.example.hello:id/btn_sendBroadcast: flags=0x00000000
      spec resource 0x7f070007 com.example.hello:id/menu_calc: flags=0x00000000
      config (default):
        resource 0x7f070000 com.example.hello:id/text_add1: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070001 com.example.hello:id/text_add2: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070002 com.example.hello:id/text_result: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070003 com.example.hello:id/submit: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070004 com.example.hello:id/test: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070005 com.example.hello:id/et_broadcastContent: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070006 com.example.hello:id/btn_sendBroadcast: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
        resource 0x7f070007 com.example.hello:id/menu_calc: t=0x12 d=0x00000000 (s=0x0008 r=0x00)
```

**configurations** 打印apk包资源配置属性

```bash
$ ./aapt.exe d configurations HelloAndroid.apk
ldpi-v4
mdpi-v4
hdpi-v4
xhdpi-v4

v11
v14
```

**xmlstrings** 打印给出的xml文件中的字符串

```bash
$ ./aapt.exe d xmlstrings HelloAndroid.apk res/layout/activity_hello.xml
String pool of 15 unique UTF-16 non-sorted strings, 15 entries and 0 styles using 440 bytes:
String #0: orientation
String #1: layout_width
String #2: layout_height
String #3: textSize
String #4: text
String #5: id
String #6: hint
String #7: inputType
String #8: android
String #9: http://schemas.android.com/apk/res/android
String #10:
String #11: LinearLayout
String #12: TextView
String #13: EditText
String #14: Button
```

**xmltree** 打印给出的已编译的xml文件

```bash
$ ./aapt.exe d xmltree HelloAndroid.apk res/layout/activity_hello.xml
N: android=http://schemas.android.com/apk/res/android
  E: LinearLayout (line=1)
    A: android:orientation(0x010100c4)=(type 0x10)0x1
    A: android:layout_width(0x010100f4)=(type 0x10)0xffffffff
    A: android:layout_height(0x010100f5)=(type 0x10)0xffffffff
    E: TextView (line=7)
      A: android:textSize(0x01010095)=(type 0x5)0x2402
      A: android:layout_width(0x010100f4)=(type 0x10)0xffffffff
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:text(0x0101014f)=@0x7f040003
    E: EditText (line=12)
      A: android:id(0x010100d0)=@0x7f070000
      A: android:layout_width(0x010100f4)=(type 0x10)0xffffffff
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:text(0x0101014f)=@0x7f040007
      A: android:hint(0x01010150)=@0x7f040004
      A: android:inputType(0x01010220)=(type 0x11)0x2002
    E: EditText (line=19)
      A: android:id(0x010100d0)=@0x7f070001
      A: android:layout_width(0x010100f4)=(type 0x10)0xffffffff
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:text(0x0101014f)=@0x7f040007
      A: android:hint(0x01010150)=@0x7f040005
      A: android:inputType(0x01010220)=(type 0x11)0x2002
    E: TextView (line=26)
      A: android:textSize(0x01010095)=(type 0x5)0x2402
      A: android:layout_width(0x010100f4)=(type 0x10)0xffffffff
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:text(0x0101014f)=@0x7f040006
    E: TextView (line=31)
      A: android:id(0x010100d0)=@0x7f070002
      A: android:layout_width(0x010100f4)=(type 0x10)0xffffffff
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:text(0x0101014f)=@0x7f040007
    E: Button (line=37)
      A: android:id(0x010100d0)=@0x7f070003
      A: android:layout_width(0x010100f4)=(type 0x10)0xfffffffe
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:text(0x0101014f)=@0x7f040002
    E: Button (line=42)
      A: android:id(0x010100d0)=@0x7f070004
      A: android:layout_width(0x010100f4)=(type 0x10)0xfffffffe
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:text(0x0101014f)=@0x7f040008
    E: EditText (line=47)
      A: android:id(0x010100d0)=@0x7f070005
      A: android:layout_width(0x010100f4)=(type 0x10)0xffffffff
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:hint(0x01010150)=@0x7f040009
    E: Button (line=53)
      A: android:id(0x010100d0)=@0x7f070006
      A: android:layout_width(0x010100f4)=(type 0x10)0xffffffff
      A: android:layout_height(0x010100f5)=(type 0x10)0xfffffffe
      A: android:text(0x0101014f)=@0x7f04000a
```

可以用来打印AndroidManifest.xml文件的xml树。

```bash
$ ./aapt.exe d xmltree HelloAndroid.apk AndroidManifest.xml
N: android=http://schemas.android.com/apk/res/android
  E: manifest (line=2)
    A: android:versionCode(0x0101021b)=(type 0x10)0x1
    A: android:versionName(0x0101021c)="1.0" (Raw: "1.0")
    A: package="com.example.hello" (Raw: "com.example.hello")
    E: uses-sdk (line=7)
      A: android:minSdkVersion(0x0101020c)=(type 0x10)0x7
      A: android:targetSdkVersion(0x01010270)=(type 0x10)0x11
    E: application (line=11)
      A: android:theme(0x01010000)=@0x7f050001
      A: android:label(0x01010001)=@0x7f040000
      A: android:icon(0x01010002)=@0x7f020000
      A: android:debuggable(0x0101000f)=(type 0x12)0xffffffff
      A: android:allowBackup(0x01010280)=(type 0x12)0xffffffff
      E: activity (line=16)
        A: android:label(0x01010001)=@0x7f040000
        A: android:name(0x01010003)="com.example.hello.Hello" (Raw: "com.example.hello.Hello")
        E: intent-filter (line=19)
          E: action (line=20)
            A: android:name(0x01010003)="android.intent.action.MAIN" (Raw: "android.intent.action.MAIN")
          E: category (line=22)
            A: android:name(0x01010003)="android.intent.category.LAUNCHER" (Raw: "android.intent.category.LAUNCHER")
      E: receiver (line=25)
        A: android:name(0x01010003)=".HelloBroadcastReceiver" (Raw: ".HelloBroadcastReceiver")
        E: intent-filter (line=26)
          E: action (line=27)
            A: android:name(0x01010003)="com.example.hello.BroadcastReceiverTest" (Raw: "com.example.hello.BroadcastReceiverTest")
```

## 参考内容

+ [Android aapt](http://elinux.org/Android_aapt)
+ [android aapt用法](http://blog.csdn.net/electricity/article/details/6540247)
