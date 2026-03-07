# Poc Ended of Justify lylera Secret
> Author: Lylera

this is vulnerability of [CVE-2022-29078](https://nvd.nist.gov/vuln/detail/CVE-2022-29078). Normally, it allows you to achieve Remote Code Execution (RCE) on the EJS environment. However, the strict WAF blocks all RCE attempts. Here is the blacklist:

```javascript
const blacklist = [
    'require', 'fs', 'child_process', 'exec', 'spawn', 'flag', 'cat',
    'global', 'process', 'mainmodule', 'this','constructor', 'proto', 'return', 
    'function', 'class', 'new', 'import',
    ' ', '+', '`', '[', ']', '\\', 'char', 'from', 
    'join', 'split', 'reverse', 'replace', 'concat', 'slice',
    'eval', 'atob', 'btoa', 'buffer', 'decode', 'reflect', 'object', 'array', 'symbol', 'padend', 'padstart', 'unescape', 'escape', 'match', 'search', 'substring', 'substr'
];
```

and the vulnerability from this program:

```javascript
        const html = ejs.render(template, query, query); 
        res.send(html);
```

and the protection of this program:

```javascript
    const rawQuery = JSON.stringify(query).toLowerCase();
        if (blacklist.some(word => rawQuery.includes(word))) {
        return res.status(403).send("What are you doing? There are nothing in here. Go away!");
    }
```

So this mean we can't use like on this website: https://eslam.io/posts/ejs-server-side-template-injection-rce/. You must use another crafter to gain the payload for this one and getting the real flag.

The payload i use:

[poc.js](https://github.com/Lunalight-Yui/Lylera-Solping-Probset-Event/blob/main/2026/ara%207.0/Ended%20of%20Justify%20Lylera%20Secret/poc.js)

and yes, you can bypass everything on blacklist using this script
