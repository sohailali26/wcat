#!usr/bin/env node

const fs=require ("fs");
let arguents=process.argv.slice(2); //process.argv is used to get all the arguments passed.
console.log(arguents);

let flags=[];
let filenames=[];
let secondaryArguments=[];

for(let i of arguents){
    if(i[0]=="-"){
        flags.push(i);
    }else if(i[0]=="$"){
        secondaryArguments.push(i.slice(1));
    } else{
        filenames.push(i);
    }
}
 
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
        //remove special characters
        if(flag=="-rsc"){
            for( let secondaryArgument of secondaryArguments){
                filedata= removeall(filedata,secondaryArgument)
            }            
        }
        //Add sequence numbering with every line
        if(flag=="-s"){
            filedata=addSequence(filedata);
        }

        //Add sequence only on non empty line
        if(flag=="-sn"){
            filedata=addSequenceTnel(filedata);
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
        contentArr[i]=(i+1)+". "+contentArr[i];
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

function removeExtraLine(fileData){
    let contentArr=fileData.split("\r\n");
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

