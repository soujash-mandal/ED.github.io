let input=document.querySelector('#input');
let searchBtn=document.querySelector('#search');
let notFound=document.querySelector('.not_found');
let defBox=document.querySelector('.def');
let audioBox=document.querySelector('.audio');
let loading=document.querySelector('.loading');


let apiKey='eeb9b3b7-59a2-4726-820d-773dd9925993';


searchBtn.addEventListener('click',function(e){
    e.preventDefault();

    //clear previous data

    audioBox.innerHTML="";
    notFound.innerText='';
    defBox.innerText='';
    
    //get input data
    let word=input.value;

    // input.value='' my addition to clear current input text

    //check word is empty or not
    if(word==='')
    {
        alert(' word is required ');
        return;
    }

    //call api get data
    getData(word);



})


//get data function which fetch data from dictionaryapi.com

async function getData(word)
{
    loading.style.display='block';

    //ajax call
    const response=await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);


    const data=await response.json();

    //if data not found
    if(!data.length)
    {
        loading.style.display='none';
        notFound.innerText='No result found';
        return;
    }

    //if result is suggestions

    if(typeof data[0]==='string')
    {
        loading.style.display='none';
        let heading = document.createElement('h3');
        heading.innerText='Did you mean?'

        notFound.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText=element;

            notFound.appendChild(suggestion);
        })

        return;

    }


    //result found
    loading.style.display='none';
    let defination=data[0].shortdef[0];
    defBox.innerText=defination;


    //sound -- audio file
    const soundName=data[0].hwi.prs[0].sound.audio;

    // check whether sound file is available or not
    if(soundName)
    {
        renderSound(soundName);
    }


    // console.log(data);

}

function renderSound(soundName)
{

    //https://media.merriam-webster.com/audio/prons/[language_code]/[country_code]/[format]/[subdirectory]/[base filename].[format]

    let subfolder=soundName.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src=soundSrc;
    aud.controls=true;
    audioBox.appendChild(aud);



}