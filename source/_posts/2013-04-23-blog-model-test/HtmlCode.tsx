import React from 'react'

export const HtmlCode = () => {
  return (
    <pre className="prettyprint linenums">
      {`#include<iostream>;
using namespace std;

int main()
{
    cout<<"Hello World!"<<endl;
    return 0;
}`}
    </pre>
  )
}

export const MathCode = () => {
  return (
    <div>
      {`$$
e^x = \\sum\\_{n=0}^\\infty \\frac{x^n}{n!} = \\lim\\_{n\\rightarrow\\infty} (1+x/n)^n
$$`}
    </div>
  )
}
