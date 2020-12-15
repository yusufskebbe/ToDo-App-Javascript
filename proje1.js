const yeniGorev = document.querySelector('.input-gorev');

const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');

const gorevListesi = document.querySelector('.gorev-listesi');




yeniGorevEkleBtn.addEventListener('click',gorevEkle);
gorevListesi.addEventListener('click',gorevSilTamamla)

document.addEventListener('DOMContentLoaded',localStoragetenOku)


function gorevSilTamamla(e){
    const tiklanilanEleman = e.target;

    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
        
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }
    if(tiklanilanEleman.classList.contains('gorev-btn-sil')){
       
        if(confirm('Emin misiniz ')){

        
    tiklanilanEleman.parentElement.classList.toggle('kaybol');// toggle varsa siliyor yoksa ekliyor
       
       const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;

       localStorageSil(silinecekGorev);


       tiklanilanEleman.parentElement.addEventListener('transitionend',function(){
        tiklanilanEleman.parentElement.remove();
       });
        }
        
    }


}

function gorevEkle(e){

    e.preventDefault(); /* herhangi bir sayfaya post olmasını engellemek için  */


    /* html de ki yapıyı javascript ile oluşturmamaız lazım  */
    if(yeniGorev.value.length > 0){
        gorevItemOlustur(yeniGorev.value);
    
        localStorageKaydet(yeniGorev.value);
        
        yeniGorev.value = '';
      
    }else{
        alert('Boş görev tanımı olmaz ');
    }
    
    
    /* Div oluşturma  */
   

   
}
function localStorgeArrayeDonustur(){
    let gorevler;

    if(localStorage.getItem('gorevler') === null){
        gorevler = [];
    }else{
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    return gorevler;
}

function localStorageKaydet(yeniGorev){
    let gorevler = localStorgeArrayeDonustur();

    

    gorevler.push(yeniGorev); // bir array oluşturduk var olan değerleri buna attık yeni elemanı koyduk 

    localStorage.setItem('gorevler',JSON.stringify(gorevler)); // bunu geri yazmamız lazım 
}

function localStoragetenOku(){ // arry alıp foreach ile dönmek gerekiyor 

    let gorevler = localStorgeArrayeDonustur();


    gorevler.forEach(function(gorev){
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev){
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item'); /* yapıyı bozmamak adına class tanımları oldugu için bunlarıda mutlaka eklememiz lazım  */
    
    
    /* li oluşturma  */

    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev; 
    gorevDiv.appendChild(gorevLi); /* li yi div'in içine koymak işlemi  */



 
    // tamamlandı butonu ekle  

    const gorevTamamBtn = document.createElement('button');
    gorevTamamBtn.classList.add('gorev-btn');
    gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamBtn.innerHTML='<i class="far fa-check-square"></i>'; 


    // btn ne yi divin içine koyma 

    gorevDiv.appendChild(gorevTamamBtn);

    // silme butonu 

    const gorevSilbtn = document.createElement('button');
    gorevSilbtn.classList.add('gorev-btn');
    gorevSilbtn.classList.add('gorev-btn-sil');
    gorevSilbtn.innerHTML='<i class="far fa-trash-alt"></i>'; 


    // btn ne yi divin içine koyma 

    gorevDiv.appendChild(gorevSilbtn);


    
   
   

    /* ul ye olusuturdugumuz divi ekleyelim  */

    gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev){

    let gorevler = localStorgeArrayeDonustur();

    //splice ile item sik 

    const silinecekElemanindex = gorevler.indexOf(gorev);

    gorevler.splice(silinecekElemanindex,1);

    localStorage.setItem('gorevler',JSON.stringify(gorevler)); //local storage geri yazmak 

}