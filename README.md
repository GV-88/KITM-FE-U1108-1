# JavaScript filmų paieškos aplikacija

Front-end vartotojo sąsaja, dirbanti su duomenimis iš [OMDb API](https://www.omdbapi.com/).

Technologijos: ES6, webpack, Laravel Mix, Sass, Font Awesome, Google Fonts

## Vartotojo aplinka, funkcionalumas

Suvedus paiešką atsiunčiamas vienas filmų sąrašo puslapis su kortelėmis, apačioje rodoma informacija apie įrašų kiekį ir mygtukas užkrauti antrą puslapį, kurį paspaudus kortelių sąrašas papildomas.

Paspaudus kortelę ji vizualiai išplečiama ir per API/cache sistemą parsiunčiama išsamesnė informacija apie filmą. Pirmą kartą gauta to filmo informacija patalpinama _session storage_, kitą kartą kreipiantis tos informacijos ji bus imama iš storage.

Pažymėjus filmo kortelę žvaigždute, filmas pridedamas į favoritų sąrašą _local storage_, saugoma minimalaus formato informacija, kuri jau gauta per "search" užklausą. Nuėmus žvaigždutę jis išimamas iš storage. Dešinėje _sidebar_ rodomas favoritų sąrašas, kuris visada kraunamas iš _local storage_, ten pernaudojamas mažos kortelės komponentas. Paspaudus kortelę favoritų sąraše, tokia pati atsiduria pagrindiniame rezultatų lange ir automatiškai išplečiama, imant išsamią informaciją iš _session storage_ arba API. Keičiant žvaigždutes, viskas puslapyje, kas susiję, atsinaujina gyvai (callback hell nenaudojant React).

_Local storage_ taip pat saugoma paieškos istorija, kuri naudojama _auto complete_, ir vartotojas turi galimybę tą istoriją išvalyti. Tiek paieškos, tiek favoritų duomenys saugomi naršyklėje FIFO principu su max riba: kiekvieną kartą pasikreipus į resursą jis atsiduria saugomo sąrašo priekyje, o pasiekus max įrašų kiekį panaikinamas seniausias įrašas. Taigi, naršyklės atmintyje visada laikoma pvz. iki 20 naujausiai žymėtų filmų.

## Paleidimas DEV aplinkoje

- `$ npm ci`
- `$ npx mix`

Reikia hostinti direktoriją "public", kitaip neužkrauna lokalių fontų. Tai galima padaryti naudojant VSCode papildinį Live Server su nustatymu `"liveServer.settings.root": "/public/"`

### .env failas

```
MIX_STATUS = dev
MIX_API_KEY = ********
```

MIX_API_KEY reikalingas išoriniam API

MIX_STATUS=dev vietoje išorinio API naudoja lokalius testinius placeholder JSON failus su specifine failų pavadinimų sistema...

#### Testiniai duomenų failai

- /public/test_data/response_sample_s_1.json
- /public/test_data/response_sample_s_2.json
- /public/test_data/response_sample_i_tt0232500.json

Šių failų viduje yra tiesiog API JSON rezultatų pavyzdinės kopijos.

"s" raidė failo pavadinime atitinka "search" tipo API užklausą, skaičius reiškia paieškos rezultatų puslapį. "i" raidė atitinka užklausą vienam resursui, prie jos yra atitinkamas IMDb ID.
