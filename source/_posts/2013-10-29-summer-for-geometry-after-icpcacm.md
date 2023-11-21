---
title: ACM计算几何题目推荐及做题统计
date: '2013-10-29 00:00:00'
category: 读书笔记
tags:
  - ACM
  - 计算几何
  - 题目推荐
  - 做题统计
---
# ACM计算几何题目推荐及做题统计

> 先前这个是放在首页的，现在结束了就把它挪到这里了，也算是对之前过程的一个留念吧。

<style>
.label-success {
    background-color: #5cb85c;
}
.label {
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
</style>

<p>今天发现自己<strong>计算几何</strong>的刷题量还是太少，所以决定将首页拿出来作为自己计算几何刷题进度的一个展示板，欢迎大家前来监督。</p>
<p />
<p>以下内容从各博客中复制过来，如果这道题目我刷过了，我会打上一个<span class="label label-success">Accept</span>，并把它的排版错位之类的问题整理一下。不能就让它这么放着呀。</p>
<p>所以说，页面越乱，证明我刷的题越少。</p>

<hr />
<div>
    
<p>来自：<a href="http://blog.csdn.net/zxy_snow/article/details/6952052" target="_blank">计算几何题目分类+简单解释 - 小媛在努力~ - 博客频道 - CSDN.NET</a></p>

<blockquote>两个斜杠是已经过的题，四个斜杠的是在ZOJ，POJ都有的题。</blockquote>
<ul>
<li>三维凸包</li>
<span class="label label-success">Accept</span>poj 3528 <span class="label label-success">Accept</span>poj 2974<br>
<span class="label label-success">Accept</span>hdu 3662 <span class="label label-success">Accept</span>hdu 4266<br>
<br>
<span class="label label-success">Accept</span>//ECNU 1624 求交集多边形面积 求俩凸多边形面积。水题。可用半平面交，也可以自己YY做。<br>
poj 1259 最大内部凸包<br>
<span class="label label-success">Accept</span>hdu 3644 多边形内能放进最大圆半径（可能是凹的，二分+判断）<br>
<span class="label label-success">Accept</span>//hdu 1086 <br>
//hdu 3982 半平面交+求凸多边形和圆的面积交<br>
//hdu 4063 注意判断线段是否被圆覆盖的方法，可以分为一小段一小段判断，也可以整体根据左圆右端点比右圆左端点靠右(靠下）判断<br>
卡壳<br>
<li>hdu</li>
<span class="label label-success">Accept</span>//3629
<li>fzu</li>
//1973<br>
<li>UVA</li>
<ul>
<li>//681  找凸包，水题</li>
<li>//634 判断点是否在多边形内</li>
<li>//11626 给你凸包的点（无序），按逆时针排序，内点排序即可</li>
<li>//109 同 POJ1264</li>
<li>//10002 求凸多边形的质心</li>
<li>//218 水题，求凸包的点还有输出总边长</li>
<li>//10173 旋转卡壳求凸包最小外接矩形</li>
<li>//11096 求凸包周长，水题</li>
<li>//10088 求多边形内点个数</li>
<li>//10065 多边形面积</li>
<li>//10652 凸包面积矩形面积</li>
<li>//361 凸包解在所有三角形内</li>
<li><span class="label label-success">Accept</span>//191 同poj1410</li>
<li>//478 判断点是否在圆，矩形，三角形内</li>
<li>//477 比478就少了个判断在三角形内</li>
<li>//476 就判断个在矩形内</li>
<li>//10078 判断多边形是否为凸包</li>
<li>//10060 给你一些钢板的形状（凸凹不限），还有厚度，给你圆井盖的半径和厚度，问你可以覆盖掉多少个井。</li>
<li>//190 POJ1329</li>
<li>//356 圆能覆盖的格子数和边界穿过的格子数</li>
<li>//10678 求椭圆面积</li>
<li>//10991 三角形面积-三个扇形面积即可</li>
<li>//143 求三角形整点个数，白皮书上的题</li>
<li>//10522 已知三角形的三高长，求面积</li>
<li>//11854 判断三角形是否为直角三角形</li>
<li>//10347 已知三角形三条中线长度求三角形面积</li>
<li>//11455 水题，判断三角形***********</li>
<li>//10577 同zoj1892</li>
<li>//10005 最小圆覆盖求半径</li>
<li>//11345 求多个矩形并</li>
<li>//10242 已知平行四边形三个点求另一个点。注意三点位置关系，样例都是连起来的，可能中间俩点不等。。</li>
<li>//11817 求大地坐标 球面距离还有直线距离之差</li>
<li>//10167 A B 要求是整数，直接枚举</li>
<li>//10897 给经纬度求 Great-Circle Distance </li>
<li>//10316 求在哪个飞机场建造个HUB使得所有飞机场到这个HUB最长距离最短。</li>
<li>//10075 大地坐标转换求距离，然后floyd，注意求floyd之前的距离也要先四舍五入</li>
</ul>

<li>ural</li>
<ul>
<li><span class="label label-success">Accept</span> //ural 1020 周长+圆周长</li>
<li><span class="label label-success">Accept</span> //ural 1052 找最多点共线</li>
<li><span class="label label-success">Accept</span> //ural 1084 求固定半径的圆 和 固定长度矩形相交面积（圆和矩形同一个中心）</li>
<li><span class="label label-success">Accept</span> //ural 1207 把点分成相等的两部分 极角排序</li>
<li><span class="label label-success">Accept</span> //ural 1348 求点到直线最远最近点</li>
<li><span class="label label-success">Accept</span> //ural 1159 二分半径，注意所有点都在圆某条直径的特殊情况</li>
<li><span class="label label-success">Accept</span> //ural 1489 三维转二维，细节注意下就OK</li>
<li><span class="label label-success">Accept</span> ural 1572 给定一个形状的尺寸（圆，正方形，等边三角形），求能放进其他形状（输入）最多的个数</li>
</ul>

<li>zoj</li>
<ul>
<li>//1010  </li>
<li>//1032  </li>
<li>//1037   </li>
<li>//1041  </li>
<li>//1081   </li>
<li>//1090   </li>
<li>//1104  二分抛物线二次项系数即可</li>
<li>1123  </li>
<li>//1128 矩形面积并</li>
<li>//1139   </li>
<li>//1158 直接枚举围墙的中点，求与墙的最多交点个数即可。</li>
<li>1165   看不懂 </li>
<li>1185   </li>
<li>//1199   两圆公切线交点，根据等比关系</li>
<li>//1247 按给的方向走，输入稍微麻烦点</li>
<li>//1248 判断一个多边形是否有核，半平面交，判断交后多边形的点的个数是否为0。</li>
<li>//1280   </li>
<li>1289  </li>
<li>//1309 求点和圆的切线，然后排序验证是否和圆相交即可</li>
<li>1357  </li>
<li>1369  </li>
<li>//1377</li>
<li>1426   判断100条线段相交形成多少个矩形 </li>
<li>//1439   </li>
<li>//1450   最小圆覆盖，随机增量方法</li>
<li><span class="label label-success">Accept</span>//1453   </li>
<li>//1460   切蛋糕，问切成多少块,欧拉定理，注意输入数据很阴险，有重边，而且切痕端点不一定都在蛋糕边缘。。</li>
<li>//1465</li>
<li>//1469   求多边形核的面积，半平面交即可。</li>
<li>//1472   圆和矩形 圆和圆 矩形和矩形 是否相交 相切也算，注意题目输入T T</li>
<li>1491  </li>
<li>1550   面？？</li>
<li>1580 1000个点 问你最多组成多少个直角三角形</li>
<li>//1597  </li>
<li>//1608   两个圆是否能放进一个矩形</li>
<li>//1648   </li>
<li>1650  给四条线段的长度，求围成最大区域面积</li>
<li>1662  </li>
<li>1683  </li>
<li>1696  N个圆 问最后能看到的能有几个</li>
<li>//1704  给你一些点，找到一个三角形的面积最大，而且其他点都不在这个三角形里面（上）</li>
<li>1739  求多边形覆盖掉的块块的面积</li>
<li>1821  </li>
<li>//1860 水题，比较长度。</li>
<li>//1868 大圆求距离最大值最小，枚举下就好</li>
<li>//1892 给你正多边形的三个点，求包围它的最小矩形面积（矩形长宽必须平行于x或y）</li>
<li>//1910</li>
<li>//1943 大地坐标求距离，用map很方便</li>
<li>//1973 给出多边形N个顶点，求出所有边的中点   </li>
<li>//1974  给出多边形N个中点，求出顶点。偶数边是不唯一的，题目给的奇数边</li>
<li>//1996</li>
<li>1999  </li>
<li>//2010   判断一个矩形是否可以放进另一个矩形里（可以斜放），离散化</li>
<li>//2015   求多边形重心</li>
<li>2062  给出N个点的多边形，求一射线使得和最多的边相交（射线不能在多边形内部）。</li>
<li>2102   给你一条棍子坐标和几个圆桌子的坐标，判断棍子是否能掉下来</li>
<li>//2107  </li>
<li>2137</li>
<li>//2157  给你多边形的几个点，求周长</li>
<li>//2167 求单位圆最多覆盖点数，求每个点形成的单位圆覆盖最多次数的弧即可   </li>
<li>2171 </li>
<li>2228  </li>
<li>2234  给出一个三角形区域和一根绳长，求绳长在三角形区域里围成的最大面积</li>
<li>2318  给出一艘圆形的船，问是否可以逃出很多圆构成的群岛</li>
<li>2335   画出三个圆，每个圆只能一次画成，求最少画的时间</li>
<li>//2347   给出1000个点，求这1000个点能组成多少个正方形</li>
<li>//2352   </li>
<li>2361   许多线构成闭合区域的面积（可能构成多块区域，输出每一块的面积）</li>
<li>//2370 给出弓形的弦长和弧长，求弓形的高  </li>
<li>2375  </li>
<li>2394  </li>
<li>//2403   可以找规律，可以模拟</li>
<li>//2419   给你5W个点，求三点能组成最大三角形的面积，旋转卡壳，引用大黄题解 O(n) 的旋转卡壳，先凸包，然后选取开头三个点 p,q,r 开始旋转，注意 r 不超过第一个点，q 不超过 r，p 不超过 q 。每次做三次推进，先推进 r，使 pq 不动面积最大，然后推进 q，再推进 p，如果三次都没有推进过，r 推进一格。每次推进完一个点都更新一下面积最大值。</li>
<li>2428   </li>
<li>//2459 给出四面体的六条楞，求体积，欧拉四面体公式   poj2208用这个公式死活过不了</li>
<li>2503   积分。。</li>
<li>2518     求椭圆柱侧面积最小面积读不懂</li>
<li>2519   </li>
<li>2525   </li>
<li>2556</li>
<li>//2551  </li>
<li>2568  </li>
<li>//2589 欧拉定理，求N个圆相交后的面数</li>
<li>2623   求两个多边形的并的面积,三角剖分？</li>
<li>2629   求最多覆盖多少个圆</li>
<li>2637  </li>
<li>2675  </li>
<li>2713  </li>
<li>2716   </li>
<li>2718   </li>
<li>//2747 求颜色不同的矩形覆盖后剩下多少种颜色的矩形，并且求出来面积。   </li>
<li>2748   </li>
<li>//2820   判断是否有核，半平面交</li>
<li>2825  </li>
<li>2854   </li>
<li>//2870 判断是否存在一条直线和所有线段有至少一个交点</li>
<li>2959   0AC的神题。。</li>
<li>//2978 同2167</li>
<li>2983</li>
<li>2993</li>
<li>3012</li>
<li>//3521 扫描线+并查集</li>
</ul>

<li>poj</li>
<ul>
<li>1031 Fence</li>
<li><span class="label label-success">Accept</span>//1039 Pipe</li>
<li><span class="label label-success">Accept</span>////1066</li>
<li>1092 Farmland</li>
<li><span class="label label-success">Accept</span>////1106 Transmitters</li>
<li><span class="label label-success">Accept</span>////1113 Wall</li>
<li>////1118 Lining Up</li>
<li>1133 Stars</li>
<li><span class="label label-success">Accept</span>1151 Atlantis</li>
<li>1225 STRICTLY INSCRIBED SIMILAR TRIANGLES</li>
<li>1259 The Picnic</li>
<li>1263 Reflections</li>
<li>// 1264 凸包+判断点是否在多边形内+多边形面积</li>
<li>//1265 Area</li>
<li><span class="label label-success">Accept</span>1266 Cover an Arc.</li>
<li><span class="label label-success">Accept</span>////1269 Intersecting Lines</li>
<li><span class="label label-success">Accept</span>//1271 Nice Milk 半平面交</li>
<li><span class="label label-success">Accept</span>////1279 Art Gallery</li>
<li>////1288</li>
<li>1294 Not Too Convex Hull</li>
<li>1319 Pipe Fitters</li>
<li><span class="label label-success">Accept</span>////1329</li>
<li>1347 Triangle</li>
<li>1361 JaWs</li>
<li><span class="label label-success">Accept</span>////1375 Intervals</li>
<li><span class="label label-success">Accept</span>//1379 Run Away</li>
<li>////1380</li>
<li>////1385</li>
<li><span class="label label-success">Accept</span>//1389 Area of Simple Polygons</li>
<li>1408 Fishnet</li>
<li><span class="label label-success">Accept</span>//1410 Intersection 线段和矩形相交，注意题意</li>
<li>//1418 Viva Confetti 求圆和圆相交的交点，然后计算交点在某个圆内，按极角排序在同一个圆周上的点（记得去重），然后计算每小段弧的中点，然后看这个中点在几个圆盘里，记录这个点和对应的id（可以记成一个点一个id）。最后扫一遍中点，未被遮住的就算到答案里。
另外需要特殊处理的就是，如果一个盘盘未被覆盖，就是它是完整的，或者它完全被覆盖，这样的话计算交点是算不出来的，需要特判。</li>
<li>1428 Hermes’ Colony</li>
<li><span class="label label-success">Accept</span>1434 Fill the Cisterns!</li>
<li>1444 Parallelepiped walk</li>
<li>////1468</li>
<li>1471 Triangles</li>
<li>////1473 There’s Treasure Everywhere!</li>
<li>////1474</li>
<li>1494 Sunrise</li>
<li>1499 Supercomputer Selection, The Sequel</li>
<li>1500 Polygonal Puzzle</li>
<li>1514 Metal Cutting</li>
<li>1518 Problem Bee</li>
<li>1536 Trains</li>
<li><span class="label label-success">Accept</span>//1556 The Doors</li>
<li>////1569 Myacm Triangles</li>
<li><span class="label label-success">Accept</span>1584 A Round Peg in a Ground Hole</li>
<li>1586 Three Sides Make a Triangle</li>
<li>1605 Horse Shoe Scoring</li>
<li>1610 Quad Trees</li>
<li>1623 Squadtrees</li>
<li>1624 This Takes the Cake</li>
<li>1645 BSP Trees</li>
<li><span class="label label-success">Accept</span>////1654 Area</li>
<li>1660 Princess FroG</li>
<li><span class="label label-success">Accept</span>1673 EXOCENTER OF A TRIANGLE</li>
<li>1685 Color Tunnels</li>
<li>1687 Buggy Sat</li>
<li>1688 Dolphin Pool</li>
<li>1693 Counting Rectangles</li>
<li><span class="label label-success">Accept</span>1696 Space Ant</li>
<li>1727 Advanced Causal Measurements (ACM)</li>
<li>1758 Frontier</li>
<li>1765 November Rain</li>
<li>1774 Fold Paper Strips</li>
<li>////1788</li>
<li>1803 Box Art</li>
<li>1810 Covering</li>
<li>1813 Overlapped Shapes</li>
<li>1819 Disks</li>
<li>1834 线段处理</li>
<li>1843 Shire</li>
<li>1851 Map</li>
<li>1871 Bullet Hole</li>
<li><span class="label label-success">Accept</span>1873 The Fortified Forest</li>
<li>1875 Robot</li>
<li>1877 Flooded!</li>
<li>1881 Sail Race</li>
<li>1899 Farmer Bill’s Problem</li>
<li>1902 Illumination</li>
<li>////1905</li>
<li>1912 A highway and the seven dwarfs</li>
<li>1921 Paper Cut</li>
<li>1927 Area in Triangle</li>
<li>1931 Biometrics</li>
<li>1937 Balanced Food</li>
<li>////1939 Diplomatic License</li>
<li>////1940 Polygon Programming with Ease</li>
<li>1956 Pumps and Pipes</li>
<li>1971 Parallelogram Counting</li>
<li>////1981 Circle and Points</li>
<li>1982 Water Tank</li>
<li><span class="label label-success">Accept</span>////2002 </li>
<li><span class="label label-success">Accept</span>////2007 Scrambled Polygon</li>
<li>2012 Triangle Cuts</li>
<li>2016 Ink Blots</li>
<li>2026 As the Crow Flies</li>
<li>2031 Building a Space Station</li>
<li>2036 I Conduit!</li>
<li>2043 Area of Polygons</li>
<li>2048 Monster Trap</li>
<li>2053 Square</li>
<li>2066 Minimax Triangulation</li>
<li><span class="label label-success">Accept</span>2069 Super Star 最小覆盖球</li>
<li><span class="label label-success">Accept</span>2074 Line of Sight</li>
<li><span class="label label-success">Accept</span>////2079 Triangle</li>
<li>2087 Petanque</li>
<li>2098 Ellipse</li>
<li>2130 Jogging</li>
<li>2149 Inherit the Spheres</li>
<li>2150 Crossing Prisms</li>
<li>2164 Find the Border</li>
<li>2165 Gunman</li>
<li>2172 Bricks</li>
<li>2177 Ghost Busters</li>
<li><span class="label label-success">Accept</span>////2187</li>
<li>2284 That Nice Euler Circuit</li>
<li><span class="label label-success">Accept</span>////2318</li>
<li><span class="label label-success">Accept</span>//2354 大地坐标系求球面距离</li>
<li><span class="label label-success">Accept</span>////2398</li>
<li>///2504 同zoj1892</li>
<li><span class="label label-success">Accept</span>//2546 求两圆相交面积</li>
<li>////2606</li>
<li>////2610</li>
<li>2621 Parallelepiped</li>
<li>2622 Convex hull</li>
<li><span class="label label-success">Accept</span>//2653</li>
<li>2686 Traveling by Stagecoach</li>
<li>2687 Earth Observation with a Mobile Robot Team</li>
<li>2747 Shy Polygons</li>
<li>////2780</li>
<li>2839 Convex Hull and Triangle</li>
<li>2932 Coneology</li>
<li>2954 Triangle</li>
<li>3011 Secrets in Shadows</li>
<li>3129 How I Wonder What You Are!</li>
<li><span class="label label-success">Accept</span>//3130 How I Mathematician Wonder What You Are! 判断是否有核，半平面交</li>
<li>3135 Polygons on the Grid</li>
<li>3334 Connected Gheeves</li>
<li><span class="label label-success">Accept</span>//3335 Rotating Scoreboard 判断是否有核，半平面交</li>
<li><span class="label label-success">Accept</span>3347 Kadj Squares</li>
<li><span class="label label-success">Accept</span>////3348</li>
<li><span class="label label-success">Accept</span>//3384 Feng Shui 半平面交</li>
<li>3407 Brookebond s’en va en guerre…</li>
<li>3410 Split convex polygon</li>
<li>//3058 求圆与环的相交面积</li>
<li>3597</li>
<li><span class="label label-success">Accept</span>//3608 Bridge Across Islands 求俩凸包最小距离，旋转卡壳</li>
</ul>
</ul>
</div>

<hr />
<div>

<p>来自：<a href="http://blog.csdn.net/yang_7_46/article/details/8525631" target="_black">ACM计算几何题目推荐 - 脑残 - 博客频道 - CSDN.NET</a></p>

<p>把下面的东东都看看，题目刷刷应该就差不多了吧哈。。哈哈。。</p>

<p>其实也谈不上推荐，只是自己做过的题目而已，甚至有的题目尚未AC，让在挣扎中。之所以推荐计算几何题，是因为，本人感觉ACM各种算法中计算几何算是比较实际的算法，在很多领域有着重要的用途（例如本人的专业，GIS）。以后若有机会，我会补充、完善这个列表。</p>

<p>计算几何题的特点与做题要领：</p>
<ol>
<li>大部分不会很难，少部分题目思路很巧妙</li>
<li>做计算几何题目，模板很重要，模板必须高度可靠。</li>
<li>要注意代码的组织，因为计算几何的题目很容易上两百行代码，里面大部分是模板。如果代码一片混乱，那么会严重影响做题正确率。</li>
<li>注意精度控制。</li>
<li>能用整数的地方尽量用整数，要想到扩大数据的方法（扩大一倍，或扩大sqrt2）。因为整数不用考虑浮点误差，而且运算比浮点快。</li>
</ol>
<br>
<ul>
<li>一、点，线，面，形基本关系，点积叉积的理解</li>
<div>
<p><span class="label label-success">Accept</span>POJ 2318 TOYS（推荐）<br>
<a href="http://poj.org/problem?id=2318" target="_blank">http://poj.org/problem?id=2318</a><br>
<span class="label label-success">Accept</span>POJ 2398 Toy Storage（推荐）<br>
<a href="http://poj.org/problem?id=2398" target="_blank">http://poj.org/problem?id=2398</a><br>
一个矩形，有被若干直线分成N个格子，给出一个点的坐标，问你该点位于哪个点中。<br>
<strong>知识点：</strong>其实就是点在凸四边形内的判断，若利用叉积的性质，可以二分求解。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 3304 Segments<br>
<a href="http://poj.org/problem?id=3304" target="_blank">http://poj.org/problem?id=3304</a><br>
<strong>知识点：</strong>线段与直线相交，注意枚举时重合点的处理<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1269 Intersecting Lines <br>
<a href="http://poj.org/problem?id=1269" target="_blank">http://poj.org/problem?id=1269</a><br>
<strong>知识点：：</strong>直线相交判断，求相交交点<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1556 The Doors （推荐）<br>
<a href="http://poj.org/problem?id=1556" target="_blank">http://poj.org/problem?id=1556</a><br>
<strong>知识点：</strong>简单图论＋简单计算几何，先求线段相交，然后再用Dij求最短路。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 2653 Pick-up sticks <br>
<a href="http://poj.org/problem?id=2653" target="_blank">http://poj.org/problem?id=2653</a><br>
<strong>知识点：</strong>还是线段相交判断，注意判断的顺序。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1066 Treasure Hunt <br>
<a href="http://poj.org/problem?id=2653" target="_blank">http://poj.org/problem?id=1066</a><br>
<strong>知识点：</strong>线段相交判断，不过必须先理解“走最少的门”是怎么一回事。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1410 Intersection <br>
<a href="http://poj.org/problem?id=1410" target="_blank">http://poj.org/problem?id=1410</a><br>
<strong>知识点：</strong>线段与矩形相交。正确理解题意中相交的定义。<br>
<strong>详见：</strong><a href="http://hi.baidu.com/novosbirsk/blog/item/68c682c67e8d1f1d9d163df0.html" target="_blank">http://hi.baidu.com/novosbirsk/blog/item/68c682c67e8d1f1d9d163df0.html</a><br>
</p>
<p><span class="label label-success">Accept</span>POJ 1696 Space Ant （推荐）<br>
<a href="http://poj.org/problem?id=1696" target="_blank">http://poj.org/problem?id=1696</a><br>
德黑兰赛区的好题目。需要理解点积叉积的性质<br>
</p>
<p><span class="label label-success">Accept</span>POJ 3347 Kadj Squares <br>
<a href="http://poj.org/problem?id=3347" target="_blank">http://poj.org/problem?id=3347</a><br>
本人的方法极度猥琐。复杂的线段相交问题。这个题目是计算几何的扩大数据运算的典型应用，扩大根号2倍之后就避免了小数。<br>
</p>
<p><span class="label label-info">Accept</span>POJ 2826 An Easy Problem?! （推荐）<br>
<a href="http://poj.org/problem?id=2826" target="_blank">http://poj.org/problem?id=2826</a><br>
问：两条直线组成一个图形，能容纳多少雨水。很不简单的Easy Problem，要考虑所有情况。你不看discuss看看能否AC。（本人基本不能）提示一下，水是从天空垂直落下的。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1039 Pipe <br>
<a href="http://poj.org/problem?id=1039" target="_blank">http://poj.org/problem?id=1039</a><br>
又是线段与直线相交的判断，再加上枚举的思想即可。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 3449 Geometric Shapes <br>
<a href="http://poj.org/problem?id=3449" target="_blank">http://poj.org/problem?id=3449</a><br>
判断几何体是否相交，不过输入输出很恶心。<br>
此外，还有一个知识点，就是给出一个正方形（边不与轴平行）的两个对角线上的顶点，需要你求出另外两个点。必须掌握其方法。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1584 A Round Peg in a Ground Hole <br>
<a href="http://poj.org/problem?id=1584" target="_blank">http://poj.org/problem?id=1584</a><br>
<strong>知识点：</strong>点到直线距离，圆与多边形相交，多边形是否为凸<br>
</p>
<p><span class="label label-success">Accept</span>POJ 2074 Line of Sight （推荐）<br>
<a href="http://poj.org/problem?id=2074" target="_blank">http://poj.org/problem?id=2074</a><br>
与视线问题的解法，关键是求过两点的直线方程，以及直线与线段的交点。数据有一个trick，要小心。<br>
</p>
</div>
<li>二、凸包问题</li>
<div>
<p><span class="label label-success">Accept</span>POJ 1113 Wall <br>
<a href="http://poj.org/problem?id=1113" target="_blank">http://poj.org/problem?id=1113</a><br>
<strong>知识点：</strong>赤裸裸的凸包问题，凸包周长加上圆周。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 2007 Scrambled Polygon <br>
<a href="http://poj.org/problem?id=2007" target="_blank">http://poj.org/problem?id=2007</a><br>
<strong>知识点：</strong>凸包，按极角序输出方案<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1873 The Fortified Forest （推荐）<br>
<a href="http://poj.org/problem?id=1873" target="_blank">http://poj.org/problem?id=1873</a><br>
World Final的水题，先求凸包，然后再搜索。由于规模不大，可以使用位运算枚举。<br>
<strong>详见：</strong>http://hi.baidu.com/novosbirsk/blog/item/333abd54c7f22c52574e0067.html<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1228 Grandpa's Estate （推荐）<br>
<a href="http://poj.org/problem?id=1228" target="_blank">http://poj.org/problem?id=1228</a><br>
求凸包顶点数目，很多人求凸包的模板是会多出点的，虽然求面积时能得到正确答案，但是在这个题目就会出问题。此外，还要正确理解凸包的性质。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 3348 Cows <br>
<a href="http://poj.org/problem?id=3348" target="_blank">http://poj.org/problem?id=3348</a><br>
凸包面积计算<br>
</p>
</div>
<li>三、面积问题，公式问题</li>
<div>
<p><span class="label label-success">Accept</span>POJ 1654 Area <br>
<a href="http://poj.org/problem?id=1654" target="_blank">http://poj.org/problem?id=1654</a><br>
<strong>知识点：</strong>利用有向面积（叉积）计算多边形面积<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1265 Area <br>
<a href="http://poj.org/problem?id=1265" target="_blank">http://poj.org/problem?id=1265</a><br>
<span class="label label-success">Accept</span>POJ 2954 Triangle <br>
<a href="http://poj.org/problem?id=2954" target="_blank">http://poj.org/problem?id=2954</a><br>
Pick公式的应用，多边形与整点的关系。（存在一个GCD的关系）<br>
</p>
</div>

<li>四、半平面交</li>
<div>
<p>半平面交的主要应用是判断多边形是否存在核，还可以解决一些与线性方程组可行区域相关的问题（就是高中时的那些）。</p>

<p><span class="label label-success">Accept</span>POJ 3335 Rotating Scoreboard<br>
<a href="http://poj.org/problem?id=3335" target="_blank">http://poj.org/problem?id=3335</a><br>
<span class="label label-success">Accept</span>POJ 3130 How I Mathematician Wonder What You Are! <br>
<a href="http://poj.org/problem?id=3130" target="_blank">http://poj.org/problem?id=3130</a><br>
<span class="label label-success">Accept</span>POJ 1474 Video Surveillance<br>
<a href="http://poj.org/problem?id=1474" target="_blank">http://poj.org/problem?id=1474</a><br>
<strong>知识点：</strong>半平面交求多边形的核，存在性判断<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1279 Art Gallery <br>
<a href="http://poj.org/problem?id=1279" target="_blank">http://poj.org/problem?id=1279</a><br>
半平面交求多边形的核，求核的面积<br>
</p>
<p><span class="label label-success">Accept</span>POJ 3525 Most Distant Point from the Sea （推荐）<br>
<a href="http://poj.org/problem?id=3525" target="_blank">http://poj.org/problem?id=3525</a><br>
给出一个多边形，求里面的一个点，其距离离多边形的边界最远，也就是多边形中最大半径圆。<br>
可以使用半平面交+二分法解。二分这个距离，边向内逼近，直到达到精度。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 3384 Feng Shui （推荐）<br>
<a href="http://poj.org/problem?id=3384" target="_blank">http://poj.org/problem?id=3384</a><br>
半平面交实际应用，用两个圆覆盖一个多边形，问最多能覆盖多边形的面积。<br>
<strong>解法：</strong>用半平面交将多边形的每条边一起向“内”推进R，得到新的多边形，然后求多边形的最远两点。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1755 Triathlon （推荐） <br>
<a href="http://poj.org/problem?id=1755" target="_blank">http://poj.org/problem?id=1755</a><br>
半平面交判断不等式是否有解。注意不等式在转化时正负号的选择，这直接影响到半平面交的方向。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 2540 Hotter Colder <br>
<a href="http://poj.org/problem?id=2540" target="_blank">http://poj.org/problem?id=2540</a><br>
半平面交求线性规划可行区域的面积。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 2451 Uyuw's Concert<br>
<a href="http://poj.org/problem?id=2451" target="_blank">http://poj.org/problem?id=2451</a><br>
Zzy专为他那篇nlogn算法解决半平面交问题的论文而出的题目。<br>
</p>
</div>
<li>五、计算几何背景，实际上解题的关键是其他问题（数据结构、组合数学，或者是枚举思想）</li>
<div>
<p>若干道经典的离散化＋扫描线的题目，ACM选手必做题目</p>

<p><span class="label label-success">Accept</span>POJ 1151 Atlantis （推荐）<br>
<a href="http://poj.org/problem?id=1151" target="_blank">http://poj.org/problem?id=1151</a><br>
<span class="label label-success">Accept</span>POJ 1389 Area of Simple Polygons<br>
<a href="http://poj.org/problem?id=1389" target="_blank">http://poj.org/problem?id=1389</a><br>
矩形离散化，线段树处理，矩形面积求交<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1177 Picture （推荐）<br>
<a href="http://poj.org/problem?id=3565" target="_blank">http://poj.org/problem?id=1177</a><br>
矩形离散化，线段树处理，矩形交的周长，这个题目的数据比较强。线段树必须高效。 <br>
</p>
<p><span class="label label-success">Accept</span>POJ 3565 Ants （推荐）<br>
<a href="http://poj.org/problem?id=3565" target="_blank">http://poj.org/problem?id=3565</a><br>
计算几何中的调整思想，有点像排序。要用到线段相交的判断。<br>
<strong>详见：</strong><a href="http://hi.baidu.com/novosbirsk/blog/item/fb668cf0f362bec47931aae2.html" target="_blank">http://hi.baidu.com/novosbirsk/blog/item/fb668cf0f362bec47931aae2.html</a><br>
</p>
<p><span class="label label-success">Accept</span>POJ 3695 Rectangles<br>
<a href="http://poj.org/problem?id=3695" target="_blank">http://poj.org/problem?id=3695</a><br>
又是矩形交的面积，但是由于是多次查询，而且矩形不多，使用组合数学中的容斥原理解决之最适合。线段树是通法，但是除了线段树，还有其他可行的方法。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 2002 Squares<br>
<a href="http://poj.org/problem?id=2002" target="_blank">http://poj.org/problem?id=2002</a><br>
枚举思想，求平面上若干个点最多能组成多少个正方形，点的Hash<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1434 Fill the Cisterns!（推荐）<br>
<a href="http://poj.org/problem?id=1434" target="_blank">http://poj.org/problem?id=1434</a><br>
一开始发昏了，准备弄个线段树。其实只是个简单的二分。<br>
</p>
</div>
<li>六、随机算法</li>
<div>
<p><span class="label label-success">Accept</span>POJ 2420 A Star not a Tree? <br>
<a href="http://poj.org/problem?id=2420" target="_blank">http://poj.org/problem?id=2420</a><br>
多边形的费马点。所谓费马点，就是多边形中一个点P，该点到其他点的距离之和最短。四边形以上的多边形没有公式求费马点，因此可以使用随机化变步长贪心法。<br>
<strong>详见：</strong><a href="http://hi.baidu.com/novosbirsk/blog/item/75983f138499f825dd54019b.html" target="_blank">http://hi.baidu.com/novosbirsk/blog/item/75983f138499f825dd54019b.html</a><br>
</p>
</div>
<li>七、解析几何</li>
<div>
<p>这种题目本人不擅长，所以做得不多，模板很重要。当然，熟练运用叉积、点积的性质还是很有用的。</p>
<p><span class="label label-success">Accept</span>POJ 1375 Intervals <br>
<a href="http://poj.org/problem?id=1375" target="_blank">http://poj.org/problem?id=1375</a><br>
<strong>知识点：</strong>过圆外一点求与圆的切线<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1329 Circle Through Three Points <br>   
<a href="http://poj.org/problem?id=1329" target="_blank">http://poj.org/problem?id=1329</a><br>
求三角形外接圆<br>
</p>
<p><span class="label label-success">Accept</span>POJ 2354 Titanic<br>
<a href="http://poj.org/problem?id=2354" target="_blank">http://poj.org/problem?id=2354</a><br>
求球面上两个点的距离，而且给的是地理经纬坐标。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1106 Transmitters<br>
<a href="http://poj.org/problem?id=1106" target="_blank">http://poj.org/problem?id=1106</a><br>
角度排序，知道斜率求角度，使用atan函数。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 1673 EXOCENTER OF A TRIANGLE<br>
<a href="http://poj.org/problem?id=1673" target="_blank">http://poj.org/problem?id=1673</a><br>
可以转化为三角形的垂心问题。<br>
</p>
</div>
<li>八、旋转卡壳</li>
<div>
<p><span class="label label-success">Accept</span>POJ 2187 Beauty Contest <br>
<a href="http://poj.org/problem?id=2187" target="_blank">http://poj.org/problem?id=2187</a><br>
凸包求最远点对。可以暴力枚举，也可以使用旋转卡壳。<br>
</p>
<p><span class="label label-success">Accept</span>POJ 3608 Bridge Across Islands（难）<br>
<a href="http://poj.org/problem?id=3608" target="_blank">http://poj.org/problem?id=3608</a><br>
两个凸包的最近距离。本人的卡壳始终WA。郁闷。<br>
</p>
</div>
<li>九、其他问题</li>
<div>
<p>POJ 1981 Circle and Points  <br>
http://poj.org/problem?id=1981 <br>
求单位圆最多能覆盖平面上多少个点 <br>
</p>
</div>
</ul>



这次的题目不再局限于POJ了，因为自己去年周游了各个OJ，反而很少在POJ切题了。而且这次推荐的题目比上次难了，也复杂多了。现在看回自己第一次写的计算几何题目推荐，实在感到当时自己写得有点肤浅。其实对于一些大牛来说，这些题目也算不了什么。

下面的OJ之中，CII是指ACM-ICPC Live Archive ，网址是：
http://cii-judge.baylor.edu/

其他OJ的地址大家都熟知了，因此不再提供。

希望各位转载的同志注明本文的出处。

一。基础题目
1.1 有固定算法的题目

A， 最近点对问题
最近点对问题的算法基于扫描线算法。
ZOJ    2107    Quoit Design    典型最近点对问题
<span class="label label-success">Accept</span>POJ    3714    Raid    变种最近点对问题

B，最小包围圆
最小包围圆的算法是一种增量算法，期望是O(n)。
ZOJ    1450    Minimal Circle   
HDU    3007    Buried memory   

C，旋转卡壳
POJ 3608    Bridge Across Islands    旋转卡壳解两凸包最小距离
<span class="label label-success">Accept</span>POJ 2079    Triangle        旋转卡壳计算平面点集最大三角形

1.2 比较简单的题目
HDU    3264    Open-air shopping malls ，圆面积相交问题，如果用二分法做的话不难
CII 3000 Tree-Lined Streets，几何+贪心    
CII 4676 Geometry Problem，模板题    
HDU 3272 Mission Impossible，枚举+镜面反射思想
POJ 3334    Connected Gheeves，二分答案，面积判定
POJ 1819    Disks，模拟一下    
CII 3905 Meteor，貌似还是比较简单
ZOJ 2589 Circles，平面图的欧拉定理，圆的相交
POJ 2194 Stacking Cylinders，向量旋转


二。经典算法

2.1 三角剖分
三角剖分这个东西貌似去年流行了一下，高校联赛时某U连续出了两次。实际上对多边形进行三角剖分是一个很常见的算法思想，因为三角形是一个比较简单的凸多 边形，可以对两个三角形比较容易地求公共面积，这也是三角剖分最常见的用途。对这个算法进行扩展，就可以求两个简单多边形的面积交了。主要是理解有向面积 的概念。

第一类是圆与三角形的相交，主要做法是分情况讨论。
<span class="label label-success">Accept</span>POJ    3675    Telescope    三角形剖分，圆与三角形的交
<span class="label label-success">Accept</span>POJ    2986    A Triangle and a Circle    三角形剖分，圆与三角形的交
ZOJ   2675    Little Mammoth    三角形剖分，圆与三角形的交

第二类是多边形与多边形相交。
HDU    3060    Area2    简单多边形面积并，三角剖分

三角形剖分的另一种变种是梯形剖分，应用起来稍有局限性，但是比三角形剖分好写。
POJ    3148    ASCII Art    多边形梯形剖分，半平面交

多边形的重心问题，也是三角形剖分的应用：
CII      4426    Blast the Enemy!

2.2 极角排序
顾名思义，极角排序一般就是有一个圆心的问题，将平面上各个点按照与圆心极角进行排序。然后就可以在线性扫描之中解决一些统计问题。不过这类问题就稍稍超出计算几何范畴了。

UVA    11696 Beacons    颇为经典的极角排序的统计问题，记得darkgt大牛有一篇文章提到这个题目。
CII 4064 Magnetic Train Tracks，极角排序的统计问题，补集思想。
UVA    11704 Caper pizza
POJ 2280    Amphiphilic Carbon Molecules，极角排序相当巧妙地解决了这个问题。


2.3 扫描线算法
扫描线算法，需要使用到平衡树辅助，写起来比较复杂（对于本菜而言）。关于平衡树，我建议是直接使用STL的set或map。所以你需要掌握一些C++的 知识，才能够看懂一份使用了map与set的代码。当年学习OI牛的代码我看得很纠结。不过只要理解了“事件点”这一个概念后就比较好办了。

HDU    3124    Moonmist        二分+扫描线。最近圆对，不存在改编最近点对的方法。不过当时数据弱，很多人乱搞过了
POJ    2927    Coneology        平衡树+扫描线，与上题类似。

下面两个题目都是关于多边形的扫描线算法，关于平面上许多凸多边形套了多少层的问题。
CII    4125    Painter ，这个是Final题，比较简单，是判断三角形嵌套层数的。
UVA        11759    IBM Fencing，上题是三角形，这题是多边形，稍稍难了一点。不过理解好扫描线算法的话应该没有问题。


2.4 其他题目
POJ    3528 Ultimate Weapon，模板化的三维凸包。知道几个三维有向体积的概念即可比较容易理解三维凸包的算法。三维凸包算法又是一种增量算法。


三。不确定算法/极值问题
POJ 3301    Texas Trip    ，算是一种模拟退火求极值的问题，通过平面旋转找到最佳答案。
<span class="label label-success">Accept</span>SPOJ 4409 Circle vs Triangle(AREA1)，也是模拟退火
UVA 11562 Hard Evidence，应用三分极值法求极值。

四。传统几何、公式题
UVA有一个名叫Shahriar Manzoor喜欢出这些题目，喜欢这类题目的同志可以研究一本名叫《近代欧式几何学》的书。不过这些题目一般中学几何知识能够解决。
CII 4413    Triangle Hazard，梅涅劳斯定理，想不到SCNU校赛出到了
UVA     11524    InCricle，三角形内切圆性质联立海伦公式
CII 4714    In-circles Again，还是公式推导
POJ    2208 Pyramids，欧拉四面体公式

五。几何结合其他算法，麻烦题

HDU    2297 Run，百度杯的题目，利用到了zzy的半平面交的极角排序思想。
CII 4448 Conduit Packing，问一个大圆能否放下四个小圆。颇为变态的Final题，算法都很基础，就是二分一个答案，枚举两个已知圆，求与已知的两圆公切的第三个圆，枚举放置的位置……关键是不好想。
CII 4510 Slalom 几何+最短路
UVA    11422 Escaping from Fractal Bacterium    ，麻烦题，主要还是向量旋转。
HDU    3228 Island Explorer，利用了最小生成树的性质。
CII 4499 Camera in the Museum，有关圆形处理的，很不错的题目。
CII 2395 Jacquard Circuits，Pick公式的应用
POJ 3747 Scout YYF II，又是一个几何问题，需要猜想一下。
POJ 3336 ACM Underground，几何预处理，并查集
CII 4428 Solar Eclipse，也是不错的题目，涉及圆的问题
CII 4206 Magic Rings，dancing links解重复覆盖问题，二分，百度杯也有个类似的题目。
POJ 1263    Reflections，与下面一个题目都是一类光线在球面上反射问题。解决方法是解析几何，参数方程，向量旋转等等。
CII 4161 Spherical Mirrors，上面题目的三维版本。
POJ 3521 Geometric Map，复杂的预处理，可以用于自虐
CII 3270 Simplified GSM Network    虽然有着V图的模型，但是规模小，所以无须出动V图算法，用半平面交即可。变态级的V图算法可以咨询三鲜教主。
CII 4617 Simple Polygon，平面上有一堆点，叫你用一笔画把这些点连起来，连成一个闭合的简单多边形，线不允许出现相交。改造一下凸包算法即可。

当然，除了上述的题目外，还有许多比较精彩的计算几何题目等待大家发掘。




这两天在学习计算几何，随便说说自己的学习过程吧。

　　基本的叉积、点积和凸包等东西就不多说什么了，网上一搜一大堆，切一些题目基本熟悉了就差不多了。

　　一些基本的题目可以自己搜索，比如这个blog：http://blog.sina.com.cn/s/blog_49c5866c0100f3om.html

　　接下来，研究了半平面交，思想方法看07年朱泽园的国家队论文，模板代码参考自我校大牛韬哥：

http://www.owent.net/2010/10/acm-%E8%AE%A1%E7%AE%97%E5%87%A0%E4%BD%95-%E4%B8%AA%E4%BA%BA%E6%A8%A1%E6%9D%BF.html

　　一些半平面交的题目：

　　<p><span class="label label-success">Accept</span>POJ 3335 Rotating Scoreboard<br>
　　<a href="http://poj.org/problem?id=3335" target="_blank">http://poj.org/problem?id=3335</a><br>
　　<span class="label label-success">Accept</span>POJ 3130 How I Mathematician Wonder What You Are!<br>
　　<a href="http://poj.org/problem?id=3130" target="_blank">http://poj.org/problem?id=3130</a><br>
　　<span class="label label-success">Accept</span>POJ 1474 Video Surveillance<br>
　　<a href="http://poj.org/problem?id=1474" target="_blank">http://poj.org/problem?id=1474</a><br>
　　<strong>知识点：</strong>半平面交求多边形的核，存在性判断<br>
    </p>
　　<p><span class="label label-success">Accept</span>POJ 1279 Art Gallery<br>
　　<a href="http://poj.org/problem?id=1279" target="_blank">http://poj.org/problem?id=1279</a><br>
　　半平面交求多边形的核，求核的面积<br>
    </p>
　　<p><span class="label label-success">Accept</span>POJ 3525 Most Distant Point from the Sea （推荐）<br>
　　<a href="http://poj.org/problem?id=3525" target="_blank">http://poj.org/problem?id=3525</a><br>
　　给出一个多边形，求里面的一个点，其距离离多边形的边界最远，也就是多边形中最大半径圆。<br>
　　<strong>解法：</strong>可以使用半平面交+二分法解。二分这个距离，边向内逼近，直到达到精度。<br>
    </p>
　　<p><span class="label label-success">Accept</span>POJ 3384 Feng Shui （推荐）<br>
　　<a href="http://poj.org/problem?id=3384" target="_blank">http://poj.org/problem?id=3384</a><br>
　　半平面交实际应用，用两个圆覆盖一个多边形，问最多能覆盖多边形的面积。<br>
　　<strong>解法：</strong>用半平面交将多边形的每条边一起向“内”推进R，得到新的多边形，然后求多边形的最远两点。<br>
    </p>
　　<p><span class="label label-success">Accept</span>POJ 1755 Triathlon （推荐）<br>
　　<a href="http://poj.org/problem?id=1755" target="_blank">http://poj.org/problem?id=1755</a><br>
　　半平面交判断不等式是否有解。注意不等式在转化时正负号的选择，这直接影响到半平面交的方向。<br>
    </p>
　　<p><span class="label label-success">Accept</span>POJ 2540 Hotter Colder<br>
　　<a href="http://poj.org/problem?id=2540" target="_blank">http://poj.org/problem?id=2540</a><br>
　　半平面交求线性规划可行区域的面积。<br>
    </p>
　　<p><span class="label label-success">Accept</span>POJ 2451 Uyuw’s Concert<br>
　　<a href="http://poj.org/problem?id=2451" target="_blank">http://poj.org/problem?id=2451</a><br>
　　Zzy专为他那篇nlogn算法解决半平面交问题的论文而出的题目。<br>
    </p>
 
　　<p>(以上题目来自别人的blog，后面还有几题是我自己找到的)</p>

　　<p><span class="label label-success">Accept</span>POJ 1271 Nice Milk<br>
　　<a href="http://poj.org/problem?id=1271" target="_blank">http://poj.org/problem?id=1271</a><br>
　　黑书习题<br>
    </p>
 
　　UVA 11722 Joining with Friend
　　http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=117&page=show_problem&problem=2769
　　概率问题，这个规模用半平面交有点浪费，不过就当练习了

 
　　USACO 2010 MARCH GOLD StarCowraft
　　http://61.187.179.132:8080/JudgeOnline/showproblem?problem_id=1829
 
　　
 

 
 
 
 
 
 
 
 
　　接下来稍微弄了一下坐标旋转的问题，具体可以参考武汉大牛的博文http://dumbear.com/blog/?p=143

　　坐标旋转题目切得不多

　　<p><span class="label label-success">Accept</span>HDU 1700 Points on Cycle<br>
　　<a href="http://acm.hdu.edu.cn/showproblem.php?pid=1700" target="_blank">http://acm.hdu.edu.cn/showproblem.php?pid=1700</a><br>
　　比较基础的一道题<br>
    </p>
　　POJ 3845 Fractal
　　http://poj.org/problem?id=3845
　　注意eps的取值
 
　　<p><span class="label label-success">Accept</span>POJ 1133 Stars<br>
　　<a href="http://acm.hdu.edu.cn/showproblem.php?pid=1133" target="_blank">http://poj.org/problem?id=1133</a><br>
    </p>
　　Harbin Online Contest 2010
　　http://acm.hrbeu.edu.cn/index.php?act=problem&id=1006&cid=16
　　三维坐标旋转。这个要有账号才能提交，还有就是Sample Input 中第二个Sample的“275”改成“270”
 
　　HDU 3623 Covering Points (2010天津网络赛C题)
　　http://acm.hdu.edu.cn/showproblem.php?pid=3623 (航电没有这题了)
　　http://acm.tju.edu.cn/toj/showp3740.html 

　　FZU 2002 Shade of Hallelujah Mountain (2010福州regional)
　　http://acm.fzu.edu.cn/problem.php?pid=2002

　　<p><span class="label label-success">Accept</span>HDU 4087 ALetter to Programmers (2011 北京现场赛)<br>
　　<a href="http://acm.hdu.edu.cn/showproblem.php?pid=4087" target="_blank">http://acm.hdu.edu.cn/showproblem.php?pid=4087</a><br>
　　三维旋转矩阵 + 矩阵加速<br>
    </p>



 

　　然后是旋转卡壳，一个很好的学习网站http://cgm.cs.mcgill.ca/~orm/rotcal.html（不过是英文的），后来找到一个大牛的blog里有部分翻译http://blog.csdn.net/ACMaker，综合起来看了一下，收益良多啊。

　　一些旋转卡壳的题目

　　<p><span class="label label-success">Accept</span>POJ 2187 Beauty Contest<br>
　　<a href="http://poj.org/problem?id=2187" target="_blank">http://poj.org/problem?id=2187</a><br>
　　凸包求最远点对。可以暴力枚举，也可以使用旋转卡壳。<br>
    <span class="label label-success">Accept</span>POJ 3608 Bridge Across Islands<br>
　　<a href="http://poj.org/problem?id=3608" target="_blank">http://poj.org/problem?id=3608</a><br>
　　两个凸包的最近距离。<br>
　　上面两题可以参考blog：<a href="http://www.cppblog.com/staryjy/archive/2009/11/19/101412.html" target="_blank">http://www.cppblog.com/staryjy/archive/2009/11/19/101412.html</a>（上面代码很不错）<br>
    </p>
　　<p><span class="label label-success">Accept</span>POJ 2079 Triangle<br>
　　<a href="http://poj.org/problem?id=2079" target="_blank">http://poj.org/problem?id=2079</a><br>
　　这题以为O(N^2)的复杂度会超时，结果就是O(N^2)复杂度<br>
    </p>
 
　　UVA 10173
　　http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&category=13&problem=1114&mosmsg=Submission+received+with+ID+8029560
　　给定点集S,求S的最小覆盖矩形
 
　　
 



　　然后看了一些扫描线之类的东西。

　　推荐几道比不错的题目：

　　POJ 2932 Coneology
　　http://poj.org/problem?id=2932
 
　　HDU 3124 Moonmist
　　http://acm.hdu.edu.cn/showproblem.php?pid=3124
　　最近圆对问题（二分 + 扫描线）

　　HDU 3867 Light and Shadow
　　http://acm.hdu.edu.cn/showproblem.php?pid=3867
　　(按极角扫描)注意-PI和PI的位置分割





<div>
    下面看了一些随机算法：（08年顾研论文-《浅谈随机化思想在几何问题中的应用》）<br>
    <ul>
        <li>（1）随机增量法：这个算法很犀利啊，把一些计算几何的问题降了一个n复杂度。（典型的有最小圆覆盖）</li>
            <p>网上找了最小圆覆盖的随机增量算法，里面代码倒是不错，就是解释的不是很清楚，推荐看《计算几何算法与应用(第3版)》（邓俊辉译，清华大学出版社出版）中第91页“4.7最小包围圆”这个章节中的内容，比较详细也很清楚，代码我参考了这个blog的<a href="http://blog.csdn.net/pvpishard/archive/2011/01/27/6167262.aspx" target="_blank">http://blog.csdn.net/pvpishard/archive/2011/01/27/6167262.aspx</a></p>
        <li>（2）模拟退火：参考顾研论文</li>
            <p>模拟退火的题目：</p>
            <p><span class="label label-success">Accept</span>POJ 1379 Run Away<br>
            <a href="http://poj.org/problem?id=1379" target="_blank">http://poj.org/problem?id=1379</a><br>
            </p> 
            <p><span class="label label-success">Accept</span>POJ 2420 A Star not a Tree?<br>
            <a href="http://poj.org/problem?id=2420" target="_blank">http://poj.org/problem?id=2420</a><br>
            </p>
            <p>URAL 1520 Empire Strikes Back（推荐）<br>
            <a href="http://acm.timus.ru/problem.aspx?space=1&num=1520" target="_blank">http://acm.timus.ru/problem.aspx?space=1&num=1520</a><br>
            顾研论文例题，不错的题目<br>
            </p>
            <p><span class="label label-success">Accept</span>POJ 2069 Super Star<br>
            <a href="http://poj.org/problem?id=2069" target="_blank">http://poj.org/problem?id=2069</a><br>
            此题我WA和TLE了很多次<br>
            </p>
            <p><span class="label label-success">Accept</span>POJ 3301 Texas Trip<br>
            <a href="http://poj.org/problem?id=3301" target="_blank">http://poj.org/problem?id=3301</a><br>
            这题也可以用三分<br>
            </p>            
            <p>SPOJ 4409 Circle vs Triangle<br>
            <a href="https://www.spoj.pl/problems/AREA1/" target="_blank">https://www.spoj.pl/problems/AREA1/</a><br>
            模拟退火 + 解析几何<br>
            </p> 
            <p>POJ 3285 Point of view in Flatland<br>
            <a href="http://poj.org/problem?id=3285" target="_blank">http://poj.org/problem?id=3285</a><br>
            这题的难点在于找到合适的评估函数，当然这题也可以通过解方程组来做<br>
            </p> 
            <p><span class="label label-success">Accept</span>POJ 2600 Geometrical dreams<br>
            <a href="http://poj.org/problem?id=2600" target="_blank">http://poj.org/problem?id=2600</a><br>
            这题不是模拟退火的题，但是可以用模拟退火过。非模拟退火的方法也不难<br>
            </p> 
    </ul>
 </div>
 
 
 
 






　　解析几何，平面最近点对，。。。这些搞得也不是很深入。

 
 


　　

　　折纸问题 参见大牛dumbear的blog http://dumbear.com/blog/?p=249

　　两道题目

　　POJ 1921 Paper Cut
　　http://poj.org/problem?id=1921
　　这题相对下一题还算比较好做
 
　　POJ 3806 Origami Through-Hole
　　http://poj.org/problem?id=3806
　　这题处理有点麻烦，我调试了很久才过
 
　
　
 
 
 
 
 
 
　　圆的面积并和交，详细可以看AekdyCoin大牛的blog

　　圆的面积并：http://hi.baidu.com/aekdycoin/blog/item/c1b28e3711246b3f0b55a95e.html

　　圆的面积交：http://hi.baidu.com/aekdycoin/blog/item/12267a4e9476153bafc3abbd.html

　　题目：

　　SPOJ 8073 The area of the union of circles
　　https://www.spoj.pl/problems/CIRU/
 
　　SPOJ 3863 Area of circles
　　https://www.spoj.pl/problems/VCIRCLES/

　　SPOJ 8119 CIRU2
　　https://www.spoj.pl/problems/CIRUT/
　　圆面积并的拓展
 
　　HDU 3467 Song of the Siren
　　http://acm.hdu.edu.cn/showproblem.php?pid=3467
 
　　HDU 3239 Jiajia's Robot (推荐)
　　http://acm.hdu.edu.cn/showproblem.php?pid=3239
　　很巧妙的一道题，我是看了AC大牛blog中的留言才知道到方法的。
　   方法见AC大牛blog中的一条留言：http://hi.baidu.com/aekdycoin/blog/item/12267a4e9476153bafc3abbd.html
 
 
　　



　　凸多边形的面积并

　　先看了AC大牛的blog学会了O(N^3)的方法，后来在做Codeforces的时候发现有O(N^2*logN)的方法，而且也不繁琐

　　AC大牛的博文：http://hi.baidu.com/aekdycoin/blog/item/fbe5a03232c71952ad4b5fcc.html

　　Codeforces Round #83 DIV1 的 E题用O(N^3)的方法过不掉第49组数据，然后研究了其他大牛的凸多边形交的代码

　　http://codeforces.com/contest/107/status/E

　　先是看了dagon的代码发现其实他的代码有问题，Codeforces的数据居然没有查出来。然后看了syntax_error的代码，

　　发现他是用类似梯形剖分的方法做的，复杂度O(N^2*logN)，果断就学习了

　　题目：http://codeforces.com/contest/107/problem/E

　　有关细节：http://www.cnblogs.com/ch3656468/archive/2011/10/17/2215551.html


 
　　有一类题目是给出一些点，并告诉你哪些点之间有连线，并且这些连线段之间除端点之外没有其他交点（有时候这些线段是要自己处理出来的）。

 　　然后题目要你求

　　　　1 每小块多边形的面积

　　　　2 有多少个K多边形内部不含点和线段

　　　　3 这些线段围成的图形的轮廓线

　　这类题目的方法都差不多，在很多大牛的blog里都可以找到类似的方法。

　　比如：　gccfeli大牛的blog：http://gccfeli.cn/2007/09/%E8%AE%A1%E7%AE%97%E5%87%A0%E4%BD%95-pku1092-%E5%A5%87%E7%89%B9%E7%9A%84%E6%8A%80%E5%B7%A7.html

　　　　　　watashi大牛的blog：http://watashi.ws/blog/970/andrew-stankevich-3-solution/

　　　　　　Isun大牛的blog：http://hi.baidu.com/xh176233756/blog/item/29652646f0e870006a63e5cb.html

　　题目：

　　POJ 1092 Farmland
　　http://poj.org/problem?id=1092

　　ZOJ 2361 Areas / SGU 209
　　http://acm.zju.edu.cn/onlinejudge/showProblem.do?problemCode=2361
　　不错的一题，watashi的blog里有解题报告
 
　　POJ 3743 LL’s cake
　　http://poj.org/problem?id=3743
 
　　POJ 2164 Find the Border
　　http://poj.org/problem?id=2164

 
 



　　三维几何

　　网上有关三维几何的内容很少阿，代码和题目基本都不怎么能搜到，我也就切了不多的几题

　　前面坐标旋转里的两到题：

 

　　　　Harbin Online Contest 2010
　　　　http://acm.hrbeu.edu.cn/index.php?act=problem&id=1006&cid=16
　　　　三维坐标旋转。这个要有账号才能提交，还有就是Sample Input 中第二个Sample的“275”改成“270”

　　　　FZU 2002 Shade of Hallelujah Mountain (2010福州regional)
　　　　http://acm.fzu.edu.cn/problem.php?pid=2002
 

　　SGU 110 Dungeon
　　http://acm.sgu.ru/problem.php?contest=0&problem=110
　　三维光线反射
 
　　FZU 1981 Three kingdoms (2010福州网络赛)
　　http://acm.fzu.edu.cn/problem.php?pid=1981
　　坐标映射，我一开始用map一直TLE，只好改成不用map的代码 
 
　　UVA 11275 3D Triangles
　　http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=2250
　　HDU 4042是这题的加强版，我使用同样的代码AC的
　　对于这题题目中诡异的精度0.000001我并没有特别处理
 
　　HDU 4042 Fireworks (2011北京网络赛)
　　http://acm.hdu.edu.cn/showproblem.php?pid=4042
　　很不错的题目 (解题报告：http://hi.baidu.com/%D0%A1%CE%E4rj/blog/item/0114bb2dcd4cdef78b13991d.html)
 
　　<p><span class="label label-success">Accept</span>HDU 4087 ALetter to Programmers (2011 北京现场赛)<br>
　　<a href="http://acm.hdu.edu.cn/showproblem.php?pid=4087" target="_blank">http://acm.hdu.edu.cn/showproblem.php?pid=4087</a><br>
　　三维旋转矩阵 + 矩阵加速<br>
    </p>

 



　　其他一些题目：

　　EOJ 283 Target Practice
　　http://202.120.106.94/onlinejudge/problemshow.php?pro_id=283
　　搜索 + 几何
 
　　POJ 1688 Dolphin Pool
　　http://poj.org/problem?id=1688
　　这题有好几种做法
 
　　POJ 1981 Circle and Points
　　http://poj.org/problem?id=1981
　　很经典的一道题目
 
    <p><span class="label label-success">Accept</span>POJ 3675 Telescope<br>
    <a href="http://poj.org/problem?id=3675" target="_blank">http://poj.org/problem?id=3675</a><br>
    圆和多边形的公共面积<br>
    </p> 
    POJ 1259 The Picnic
　　http://poj.org/problem?id=1259
　　最大凸洞，计算几何 + DP
 
　　POJ 1586 Three Sides Make a Triangle
　　http://poj.org/problem?id=1586
　　题目内容很简单，方法也很明显，不过想AC可不容易，精度很恶心的一题，我是看了discuss才过的
    
    <p><span class="label label-success">Accept</span>HDU 3629 Convex （推荐）<br>
    <a href="http://acm.hdu.edu.cn/showproblem.php?pid=3629" target="_blank">http://acm.hdu.edu.cn/showproblem.php?pid=3629</a><br>
    一道不错的题目，这题有两种思路：<br>
        1)<a href="http://apps.topcoder.com/wiki/display/tc/TCO%2710+Online+Round+4" target="_blank">http://apps.topcoder.com/wiki/display/tc/TCO%2710+Online+Round+4</a><br>
        2)<a href="http://www.owent.net/2010/09/the-35th-acmicpc-asia-regional-tianjin-site-%E2%80%94%E2%80%94-online-contest-1009-convex-%E8%A7%A3%E9%A2%98%E6%8A%A5%E5%91%8A.html" target="_blank">http://www.owent.net/2010/09/the-35th-acmicpc-asia-regional-tianjin-site-%E2%80%94%E2%80%94-online-contest-1009-convex-%E8%A7%A3%E9%A2%98%E6%8A%A5%E5%91%8A.html</a><br>
    </p>
    <p><span class="label label-success">Accept</span>HDU 3644 A Chocolate Manufacturer's Problem (2010杭州网络赛)<br>
    <a href="http://acm.hdu.edu.cn/showproblem.php?pid=3644" target="_blank">http://acm.hdu.edu.cn/showproblem.php?pid=3644</a><br>
    本来想用模拟退火水一下的，结果徘徊于WA和TLE之间无法AC<br>
    </p>
　　FZU 1973 How many stars (推荐) (2010福州网络赛)
　　http://acm.fzu.edu.cn/problem.php?pid=1973
　　比较经典的一道题目
 
　　POI2007 对称轴osi
　　http://www.zybbs.org/JudgeOnline/problem.php?id=1100
　　很犀利的一道题目，题意是判多边形的对称轴个数，原来做的这种题目都是用O(N^2)的复杂度来解的，
　　这次O(N^2)果断不行，加随机化也过不了，最后在解题报告的指导下才搞定这题。第一次发现计算几何
　　的问题居然还能用字符串的方法解。
　　网上搜到的解题报告：http://hi.baidu.com/nplusnplusnplu/blog/item/d260baef2e9e9c5879f055cb.html
 
</div>
