const { CONNREFUSED } = require("dns");
const fs=require ("fs");
let arguents=process.argv.slice(2);
console.log(arguents);

let flags=[];
let filenames=[];

for(let i of arguents){
    if(i[0]=="-"){
        flags.push(i);
    }else{
        filenames.push(i);
    }
}
// //comand to read file
// if(flag.length==0){
//     for(let file of filenames){
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }else{
//     //(-rs) command to remove spaces
//     for(let flag of flags){
//         if(flag=="-rs"){
//             for(let file of filenames){
//                 let filedata=fs.readFileSync(file,"utf-8");
//                 console.log(filedata.split(" ").join(""));
//             }
//         }
//     }
// }



// optimised code 
function removeall(string,removaldata){
    return string.split(removaldata).join("");
}

for(let file of filenames){
    let filedata=fs.readFileSync(file,"utf-8");
    for(let flag of flags){

        //remove space
        if(flag=="-rs"){
            
            filedata=removeall(filedata," ");
        }
        //remove new line
        if(flag=="-rn"){
            filedata=removeall(filedata,"\r\n");
        }
        if(flag=="-rsc"){
            
        }
        //Add sequence numbering with every line
        if(flag=="-s"){
            let data=addSequence(filedata);
            console.log(data);

        }

        //Add sequence only on non empty line
        if(flag=="-sn"){
            let data=addSequenceTnel(filedata);
            console.log(data);
        }
        //remove more then one new line
        if(flag=="-rel"){
            let ans=removeExtraLine(filedata);
            for(let i=0;i<ans.length;i++){
                console.log(ans[i]);
            }
        }
        //copy folder 1 content to folder 2
        //search on google CAT COMMANTS IN LINUX
    }
    console.log(filedata);
}


function addSequence(content){
    let contentArr=content.split("\r\n");
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1)+" "+contentArr[i];
    }
    return contentArr;
}

function addSequenceTnel(content){
    let contentArr=content.split("\r\n");
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=count+" "+contentArr[i];
            count++;
        }
    }
    
    return contentArr;
}
function removeExtraLine(content){
    let contentArr=content.split("\r\n")
    let data=[];
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }

    }
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }

    }
    return data;


}



