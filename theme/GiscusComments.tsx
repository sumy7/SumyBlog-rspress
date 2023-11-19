import Giscus from '@giscus/react';

export default function Comments() {
    return <Giscus
    id="comments"
    repo="sumy7/sumy7.github.io"
    repoId="MDEwOlJlcG9zaXRvcnkzNDExMDEyOQ=="
    category="Announcements"
    categoryId="DIC_kwDOAgh6sc4Ca7BZ"
    mapping="pathname"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="top"
    theme="preferred_color_scheme"
    lang="zh-CN"
    loading="lazy"
  />
}