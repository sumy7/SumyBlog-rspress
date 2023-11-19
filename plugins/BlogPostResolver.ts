import {AdditionalPage, RspressPlugin} from '@rspress/shared';
import path from "node:path";
import fs, {PathLike} from 'node:fs';
import {Permalink} from "hexo-util";

// 遍历文件夹
function traverseFolder(folderPath: PathLike, callback: (path: PathLike) => void) {
    const items = fs.readdirSync(folderPath);
    items.forEach(item => {
        const itemPath = path.join(folderPath.toString(), item);
        const stats = fs.statSync(itemPath);
        if (stats.isDirectory()) {
            traverseFolder(itemPath, callback);
        } else if (stats.isFile()) {
            callback(itemPath);
        }
    });
}

export function blogPostResolver(): RspressPlugin {
    const fileNamePattern = ":year-:month-:day-:title.md"
    const permalinkPattern = ":year/:month/:day/:title/"

    const configBlogFileName = fileNamePattern.substring(0, fileNamePattern.length - path.extname(fileNamePattern).length)
    const formFileNamePermalink = new Permalink(configBlogFileName, {
        segments: {
            year: /(\d{4})/,
            month: /(\d{2})/,
            day: /(\d{2})/,
            i_month: /(\d{1,2})/,
            i_day: /(\d{1,2})/,
            hash: /([0-9a-f]{12})/
        }
    })
    const toRoutePathPermalink = new Permalink(permalinkPattern)

    return {
        name: 'blog-post-resolver',
        addPages() {
            // 遍历soruce/_posts目录，获取mdx、md、html文件，生成路由
            const postsDir = path.join(__dirname, '../source/_posts')
            const posts: AdditionalPage[] = []
            traverseFolder(postsDir, (itemPath) => {
                let filename = path.basename(itemPath.toString())
                const extname = path.extname(filename)
                if (['.mdx', '.md', '.html'].indexOf(extname) === -1) {
                    return
                }
                // 如果文件名为index，则以文件夹名为路由
                if (filename.indexOf('index') >=0 ) {
                    filename = path.basename(path.dirname(itemPath.toString())) + extname
                }
                const filePath = filename.substring(0, filename.length - extname.length)
                const data = formFileNamePermalink.parse(filePath)
                let routePath = `/blog/${filePath}/`
                if (data) {
                    routePath = `/${toRoutePathPermalink.stringify(data)}`
                }
                posts.push({
                    routePath,
                    filepath: itemPath.toString()
                })
            })

            return posts
        }
    }
}
