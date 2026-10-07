function q(prompt, options, answer, why) {
  return {
    prompt,
    options: ["A", "B", "C", "D"].map((id, index) => ({ id, text: options[index] })),
    answer,
    why,
  };
}

const LESSON = {
  "kaizen/krok": [
    q(
      "Czym w tym kursie jest Kaizen?",
      [
        "Jednym postanowieniem, że od jutra nie ma ani jednego papierosa",
        "Poprawą o cal, którą da się powtórzyć także w gorszy dzień",
        "Liczeniem tylko dni bez wpadki i skreślaniem reszty",
        "Zakazem kawy, przerw i wieczornych wyjść",
      ],
      "B",
      "Kaizen to mała poprawa, którą udźwigniesz także w czwartek. Skok „od jutra zero” właśnie dlatego się urywa.",
    ),
    q(
      "Dlaczego wielki skok często kończy się w zwykły czwartek?",
      [
        "Bo czwartek z definicji jest słabszy niż poniedziałek",
        "Bo plan wymaga formy, której w krzywy dzień nie ma",
        "Bo małe kroki są wolniejsze i dlatego gorsze",
        "Bo papierosów nie da się ruszyć inaczej niż zakazem",
      ],
      "B",
      "Skok stawia warunek: musisz być w formie. Mały krok tego warunku nie stawia.",
    ),
    q(
      "Dobry pierwszy moment na krok to ten, który…",
      [
        "Zdarza się raz na miesiąc i da się o nim długo myśleć",
        "Wraca prawie codziennie, na przykład przy kawie albo progu",
        "Jest najtrudniejszy w całym roku, żeby od razu było „na poważnie”",
        "Nie ma adresu — chodzi o palenie w ogóle",
      ],
      "B",
      "Codzienny adres (kawa, przystanek, próg) daje miejsce na jeden cal. Rzadki albo bezadresowy cel znowu jest skokiem.",
    ),
  ],
  "kaizen/nawyk": [
    q(
      "Z czego składa się pętla papierosa w tej lekcji?",
      [
        "Z wstydu, kary i poniedziałku",
        "Z sygnału, sięgnięcia i krótkiej ulgi",
        "Z ceny paczki, liczby dni i opinii innych",
        "Z samego nikotynowego głodu, bez sytuacji",
      ],
      "B",
      "Sygnał, ręka i ulga. Gdy je nazwiesz, widać, gdzie wstawić cal.",
    ),
    q(
      "Co mówi wpadka według tej lekcji?",
      [
        "Że nie masz charakteru",
        "Że pętla jest wyćwiczona i da się ją ruszyć mniejszym ruchem niż wstyd",
        "Że kurs trzeba skreślić i zacząć od nowa w poniedziałek",
        "Że licznik powinien ukryć ten dzień",
      ],
      "B",
      "Wpadka jest informacją o wyćwiczonej pętli, nie oceną osoby.",
    ),
    q(
      "Przesunięcie sygnału oznacza…",
      [
        "Wyrzucenie kawy i zakaz wychodzenia z domu",
        "Jedną czynność między sygnałem a papierosem, bez kasowania całego rytuału",
        "Obietnicę, że w tej sytuacji już nigdy nie zapalisz",
        "Czekanie, aż ochota sama zniknie na zawsze",
      ],
      "B",
      "Kawa i przystanek mogą zostać. Rozsunąć je od dymu o jedną czynność — to jest cal.",
    ),
  ],
  "kaizen/dzien": [
    q(
      "Kiedy krok jest jeszcze za duży?",
      [
        "Gdy da się go zrobić po złym śnie",
        "Gdy nie mieści się w dzisiejszym dniu",
        "Gdy dotyczy tylko jednej sceny",
        "Gdy da się go zapisać jednym zdaniem",
      ],
      "B",
      "Jeśli nie zrobisz tego dziś, to znowu skok. Zmniejsz, aż wejdzie w kalendarz.",
    ),
    q(
      "Które zdanie jest krokiem, a nie hasłem?",
      [
        "Będę silniejszy",
        "Od dziś wcale",
        "Przy porannej kawie najpierw piję połowę, dopiero potem decyduję",
        "Koniec z nałogiem",
      ],
      "C",
      "Krok ma miejsce, czas i jedną zmianę. Hasło nie da się sprawdzić.",
    ),
    q(
      "Ile scen obejmuje krok na ten dzień?",
      [
        "Wszystkie papierosy doby",
        "Jedną scenę i jedną zmianę",
        "Cały tydzień z góry",
        "Tylko te sytuacje, w których na pewno nie zapalisz",
      ],
      "B",
      "Jedna scena, jedna zmiana. Reszta dnia może zostać jaka jest.",
    ),
  ],
  "kaizen/licz": [
    q(
      "Po co na początku liczyć momenty przed sięgnięciem?",
      [
        "Żeby mieć za co siebie skreślić",
        "Bo to trening zauważania, nie ozdoba przy liczbie papierosów",
        "Żeby porównać się z cudzym tygodniem",
        "Liczy się tylko seria dni bez wpadki",
      ],
      "B",
      "Dwie liczby: papierosy i złapane momenty. Druga pokazuje, że automat został przerwany.",
    ),
    q(
      "Dlaczego kara zaciemnia dane?",
      [
        "Bo po karze dokładniej pamiętasz każdy papieros",
        "Bo gdy każdy papieros jest porażką, przestajesz patrzeć",
        "Bo licznik działa tylko przy stu procentach",
        "Bo Kaizen nie używa żadnych liczb",
      ],
      "B",
      "Wstyd zamiast informacji. Lustro ma zostać lustrem, nie wyrokiem.",
    ),
    q(
      "Co robić po tym, jak zapalisz?",
      [
        "Skreślić dzień i czekać do poniedziałku",
        "Zapisać scenę i wrócić do tego samego małego kroku",
        "Podnieść poprzeczkę, żeby wyrównać wstyd",
        "Uznać, że małe kroki nie działają",
      ],
      "B",
      "Wpadka zostawia ślad. Nie kasuje kursu i nie wymaga nowego, większego planu.",
    ),
  ],
  "ikigai/pytania": [
    q(
      "Czego szukasz w czterech pytaniach Ikigai w tym kursie?",
      [
        "Hasła nadającego się na plakat",
        "Jednego powodu, który poznajesz, nie sloganu",
        "Odpowiedzi na wszystkie cztery naraz, inaczej moduł się nie liczy",
        "Dowodu, że palenie było błędem moralnym",
      ],
      "B",
      "Wystarczy jedno własne zdanie. Cztery pytania są mapą, nie egzaminem.",
    ),
    q(
      "Gdzie często stoi papieros wobec Ikigai?",
      [
        "W miejscu pauzy albo nagrody, które miało być twoje",
        "Wyłącznie w cenie paczki",
        "Tylko przy chorobach, nie przy zwykłym dniu",
        "Nigdzie — Ikigai nie dotyczy nawyków",
      ],
      "A",
      "Dym pożyczył przerwę. Mały krok oddaje ją jednej czynności, którą naprawdę lubisz.",
    ),
    q(
      "Które pytanie jest najbliższe lekcji?",
      [
        "Jak zniknąć z życia innych na miesiąc",
        "Co lubisz robić, gdy nikt nie patrzy",
        "Ile papierosów wolno przy Ikigai",
        "Który cytat brzmi dojrzalej",
      ],
      "B",
      "Cztery pytania są ciche i konkretne: lubisz, jesteś potrzebny, ktoś dziękuje, dzień ma rytm.",
    ),
  ],
  "ikigai/poranek": [
    q(
      "Co jest już małym Ikigai według tej lekcji?",
      [
        "Idealny poranek bez żadnego pośpiechu",
        "Poranek, w którym pierwsza czynność nie jest automatycznym dymem",
        "Rezygnacja ze śniadania i kawy",
        "Hasło „dla zdrowia” powtórzone w myślach",
      ],
      "B",
      "Jedna twoja czynność przed paczką oddaje start dnia tobie, nie pętli.",
    ),
    q(
      "Dlaczego „dla zdrowia” bywa za słabe o szóstej rano?",
      [
        "Bo zdrowie nie ma związku z paleniem",
        "Bo jest prawdziwe i zbyt szerokie na tamten moment",
        "Bo wolno używać tylko argumentu o pieniądzach",
        "Bo poranek nie nadaje się na żaden powód",
      ],
      "B",
      "Szerokie hasło odpada, gdy jesteś półprzytomny. Konkret („najpierw słyszę oddech”) da się zrobić.",
    ),
    q(
      "Mały krok w poranku to…",
      [
        "Przebudowa całego ranka od dziś",
        "Jedna czynność wstawiona przed paczkę",
        "Zakaz wstawania przed ósmą",
        "Obietnica, że rano już nigdy nie zapalisz",
      ],
      "B",
      "Woda, okno, pół kawy. Cal, nie remont dnia.",
    ),
  ],
  "ikigai/chronic": [
    q(
      "Ile rzeczy wybierasz na kotwicę?",
      [
        "Jedną",
        "Dziesięć, inaczej powód jest za słaby",
        "Żadnej — wystarczy regulamin",
        "Tyle, ile osób cię obserwuje",
      ],
      "A",
      "Jedna rzecz, której dym ma przestać zabierać. Przy fali przypominasz sobie ją, nie regulamin.",
    ),
    q(
      "Który przykład jest kotwicą z lekcji?",
      [
        "„Będę najlepszą wersją siebie”",
        "Schody bez zatrzymania albo wieczór bez dymu w kurtce",
        "Porównanie z kimś, kto nie pali od lat",
        "Zakaz myślenia o papierosie",
      ],
      "B",
      "Kotwica jest konkretna i twoja. Hasło o „pełni” jest za duże.",
    ),
    q(
      "Co wystarczy na tym etapie Ikigai?",
      [
        "Żeby cały dzień był już „pełnią”",
        "Żeby jeden fragment dnia był znowu twój",
        "Żeby odpowiedzieć na cztery pytania idealnie",
        "Żeby nie mieć żadnych fal ochoty",
      ],
      "B",
      "Małe jest wystarczające. Reszta może dojść calami.",
    ),
  ],
  "ochota/fala": [
    q(
      "Czym jest fala ochoty?",
      [
        "Rozkazem, który trzeba spełnić, żeby zniknął",
        "Falą, która rośnie i opada także wtedy, gdy jej nie posłuchasz",
        "Dowodem, że dzień jest stracony",
        "Stanem, który trwa cały wieczór bez przerwy",
      ],
      "B",
      "Szczyt mija, nawet jeśli stoisz. Spełnienie nie jest warunkiem, żeby fala opadła.",
    ),
    q(
      "Po co nazywać falę na głos?",
      [
        "Żeby ją natychmiast zgasić",
        "Żeby odebrać jej rangę rozkazu",
        "Żeby mieć powód do wstydu",
        "Nazywanie nie ma tu znaczenia",
      ],
      "B",
      "„To ochota, nie polecenie” nie gasi fali. Pokazuje, że jest wybór.",
    ),
    q(
      "Czego nie obiecujesz sobie w szczycie fali?",
      [
        "Że zostaniejsz przy niej przez środek",
        "Że będzie przyjemnie",
        "Że to potrwa krócej niż opowieść o całym wieczorze",
        "Że wolno nazwać to ochotą",
      ],
      "B",
      "Lekcja nie obiecuje komfortu. Obiecuje tylko, że da się zostać przy fali, aż minie środek.",
    ),
  ],
  "ochota/oddechy": [
    q(
      "Ile trwa pauza z tej lekcji?",
      [
        "Pół godziny medytacji",
        "Dziesięć oddechów między sygnałem a decyzją",
        "Cały dzień bez myślenia o papierosie",
        "Dopiero wtedy, gdy jest idealna cisza",
      ],
      "B",
      "Dziesięć oddechów to cal w środku pętli. Nie trzeba do tego aplikacji.",
    ),
    q(
      "Jeśli po pauzie i tak zapalisz, pauza…",
      [
        "Się nie liczy",
        "Się liczy, bo przerwany został automat",
        "Kasuje cały moduł",
        "Jest błędem technicznym",
      ],
      "B",
      "Sam fakt przerwy przed decyzją jest treningiem. Wynik „zapaliłem” nie wymazuje pauzy.",
    ),
    q(
      "Dlaczego oddech wygrywa z dyskusją w szczycie fali?",
      [
        "Bo argumenty są wtedy głośniejsze niż ciało",
        "Bo ciało rozumie oddech lepiej niż wykład",
        "Bo nie wolno myśleć w trakcie ochoty",
        "Bo liczenie oddechów zastępuje powód z Ikigai",
      ],
      "B",
      "W szczycie wykład przegrywa. Oddech jest narzędziem, które ciało przyjmuje od razu.",
    ),
  ],
  "ochota/zdanie": [
    q(
      "Jakie zdanie wytrzymuje trudną minutę?",
      [
        "Długi cytat, który brzmi mądrze",
        "Krótkie i twoje, powtarzane także w łatwy dzień",
        "Nowe za każdym razem, żeby się nie nudziło",
        "Takie, którego używasz tylko w kryzysie",
      ],
      "B",
      "Znajome własne zdanie zostaje, gdy jesteś zły. Cudze hasło odpada.",
    ),
    q(
      "Po co powtarzać zdanie w łatwy dzień?",
      [
        "Nie ma po co — zostaw je na kryzys",
        "Żeby było znajome, zanim fala będzie głośna",
        "Żeby podnieść poprzeczkę",
        "Żeby zastąpić wszystkie lekcje jednym hasłem",
      ],
      "B",
      "Powtórka w spokojny dzień jest częścią kroku. W kryzysie nie ma czasu na wymyślanie nowego tekstu.",
    ),
    q(
      "Które zdanie pasuje do lekcji?",
      [
        "Musisz być silniejszy niż wszyscy",
        "Jeszcze ten oddech",
        "Od dziś nigdy, bez wyjątków, albo wcale",
        "Nie myśl o tym",
      ],
      "B",
      "Krótkie i wykonalne. „Nigdy” i „nie myśl” są za duże albo niemożliwe.",
    ),
  ],
  "miejsca/kawa": [
    q(
      "O co prosi mózg przy „kawie z papierosem”?",
      [
        "Wyłącznie o kofeinę",
        "O parę: kubek i dym",
        "O zmianę gatunku kawy",
        "O rezygnację z picia czegokolwiek",
      ],
      "B",
      "To jeden gest z dwóch rzeczy. Rozdzielenie pary przez kilka dni smakuje „nie tak” i to jest normalne.",
    ),
    q(
      "Jaki jest mały krok przy kawie?",
      [
        "Wyrzucić kawę na zawsze",
        "Wypić najpierw połowę kubka i dopiero potem podjąć osobną decyzję o papierosie",
        "Pić tylko na stojąco na balkonie, zawsze z dymem",
        "Zamienić kawę na papierosa",
      ],
      "B",
      "Kawa zostaje. Papieros przestaje być dokończeniem łyka.",
    ),
    q(
      "Po co usiąść o dwa kroki dalej?",
      [
        "Żeby ciało zgubiło stary adres gestu",
        "Żeby kawa smakowała mocniej",
        "Żeby mieć powód do większego zakazu",
        "Miejsce nie ma znaczenia, liczy się tylko siła woli",
      ],
      "A",
      "Ten sam napój, inny punkt w kuchni. Rytuał zostaje, adres gestu się przesuwa.",
    ),
  ],
  "miejsca/przerwa": [
    q(
      "Co zostaje z przerwy w pracy, gdy odkładasz dym?",
      [
        "Nic — bez papierosa przerwa jest nielegalna",
        "Prawo do wyjścia, nawet jeśli przez chwilę jest pusta",
        "Obowiązek zostania przy biurku",
        "Tylko przerwa, w której i tak palisz „mniej”",
      ],
      "B",
      "Jeśli jedynym powodem wyjścia był papieros, ciało będzie go bronić. Najpierw zostaw samo wyjście.",
    ),
    q(
      "Po co zająć ręce w przerwie?",
      [
        "Puste ręce często kończą w paczce",
        "Żeby wyglądać na zajętego",
        "Ręce nie mają związku z nawykiem",
        "Żeby zastąpić przerwę kolejnym zadaniem",
      ],
      "A",
      "Kubek albo kieszenie to cal na czas, w którym stary gest jeszcze krzyczy.",
    ),
    q(
      "Pięć minut na dworze bez dymu…",
      [
        "Nie liczy się jako przerwa",
        "Nadal jest przerwą",
        "Jest dozwolone tylko po zaliczeniu egzaminu",
        "Trzeba je odpracować dłuższą zmianą",
      ],
      "B",
      "Przerwa nie pożycza nazwy od papierosa. Pusta chwila na dworze nadal jest twoja.",
    ),
  ],
  "miejsca/droga": [
    q(
      "Co nazywamy adresem papierosa?",
      [
        "Ogólny stres, bez miejsca",
        "Konkretne miejsce, na przykład próg albo klatkę",
        "Tylko cenę paczki",
        "Opinię ludzi w pracy",
      ],
      "B",
      "Ostatni przed drzwiami, pierwszy po kluczu. To miejsce, nie „stres w ogóle”.",
    ),
    q(
      "Linia progu w tej lekcji to…",
      [
        "Sieć zakazów na cały dom",
        "Jedna umowa na kilka dni: po której stronie drzwi decyzja jest osobna",
        "Obietnica, że w domu już nigdy",
        "Zakaz wracania tą samą drogą przez miesiąc",
      ],
      "B",
      "Jedna linia. Nie siatka zakazów. Stronę wybierasz według tego, który adres jest trudniejszy.",
    ),
    q(
      "Mały krok na drodze do domu może brzmieć…",
      [
        "Zmieniam całe życie towarzyskie",
        "Dziś omijam jeden zakręt albo zostawiam paczkę w kieszeni kurtki do progu",
        "Nie wracam do domu, dopóki ochota nie minie na zawsze",
        "Palę tylko w samochodzie, więc to się nie liczy",
      ],
      "B",
      "Jeden zakręt albo jedna kieszeń. Wieczór nie musi zaczynać się od dymu, żeby reszta trasy została.",
    ),
  ],
  "cialo/doba": [
    q(
      "Co oznacza głośna pierwsza doba?",
      [
        "Że plan z definicji padł",
        "Że ciało zgłasza brak znanego gestu",
        "Że tak będzie już przez rok",
        "Że trzeba od razu podnieść poprzeczkę",
      ],
      "B",
      "To komunikat o znikniętym geście, nie wyrok. Pierwsza doba nie jest próbką całego roku.",
    ),
    q(
      "Czego nie dokładać do fali w pierwszej dobie?",
      [
        "Zdania, że „tak już będzie zawsze”",
        "Nazwania ochoty",
        "Wczorajszego małego kroku",
        "Wody",
      ],
      "A",
      "Opowieść o wieczności podkręca falę. Zostaw wczorajszy cal.",
    ),
    q(
      "Gdy dzień jest za ostry, lekcja radzi…",
      [
        "Zrezygnować z patrzenia",
        "Zmniejszyć krok, nie rezygnować z zauważania",
        "Wrócić do skoku „od dziś wcale”",
        "Skreślić moduł o ciele",
      ],
      "B",
      "W głośny dzień poprzeczka w dół, uwaga zostaje. To nadal Kaizen.",
    ),
  ],
  "cialo/sen": [
    q(
      "Poszarpany sen po odstawieniu gestu…",
      [
        "Unieważnia kierunek",
        "Bywa częsty i zwykle krótki, bo nikotyna była częścią rytmu",
        "Oznacza, że wolno palić tylko w nocy",
        "Wymaga nowego, dużego planu o północy",
      ],
      "B",
      "Niewygoda nocy nie jest powodem, żeby uznać tydzień za stracony.",
    ),
    q(
      "Wieczorny papieros „na sen” najczęściej jest…",
      [
        "Innym problemem niż adres drogi do domu",
        "Tym samym adresem, który już znasz z progu",
        "Dowodem Ikigai",
        "Czymś, czego nie wolno nazywać",
      ],
      "B",
      "To często ten sam próg. Zostaw jedną linię, nie dokładaj zakazu o północy.",
    ),
    q(
      "Tańsze sprawdzenie ssania w ustach niż papieros to…",
      [
        "Szklanka wody",
        "Od razu cała paczka, żeby „mieć spokój”",
        "Porównanie z innymi",
        "Rezygnacja z jedzenia na cały dzień",
      ],
      "A",
      "Czasem to pragnienie albo głód, nie rozkaz. Woda jest pierwszym sprawdzeniem, nie dietą.",
    ),
  ],
  "cialo/kilka": [
    q(
      "Dlaczego łatwo przegapić spokojniejszy fragment dnia?",
      [
        "Bo jest cichy, a kryzys krzyczy",
        "Bo takie fragmenty nie istnieją",
        "Bo wolno notować tylko wpadki",
        "Bo Ikigai zabrania drobnych dowodów",
      ],
      "A",
      "Schody, kawa, poranek bez kaszlu. To dane. Zapisz jedną taką rzecz.",
    ),
    q(
      "Co robić, gdy zrobi się lżej?",
      [
        "Od razu skoczyć w „od dziś wcale”",
        "Zostać przy tym samym calu jeszcze kilka dni",
        "Przestać zauważać, skoro jest lepiej",
        "Zmieniać krok co dwa dni",
      ],
      "B",
      "Lżej to nie sygnał do skoku. Stałość uczy więcej niż nowy plan.",
    ),
    q(
      "Cicha poprawa jest…",
      [
        "Mniej ważna niż kryzys, więc się jej nie liczy",
        "Daną, tak samo jak fala",
        "Powodem do wstydu",
        "Znakiem, że moduł o ciele można pominąć",
      ],
      "B",
      "Lustro ma pokazywać obie strony: falę i lżejszy kawałek dnia.",
    ),
  ],
  "kierunek/wpadka": [
    q(
      "Bliższe faktom zdanie po jednym papierosie to…",
      [
        "Znowu palę, czyli jestem z powrotem na starcie",
        "W tej scenie zapaliłem",
        "Małe kroki nie działają",
        "Trzeba skreślić tydzień",
      ],
      "B",
      "Jeden papieros jest zdarzeniem w scenie. Zdanie o tożsamości kasuje tydzień pracy.",
    ),
    q(
      "Kiedy wracasz do kroku po wpadce?",
      [
        "W najbliższy poniedziałek",
        "W następny moment tego samego dnia",
        "Dopiero po egzaminie",
        "Gdy minie miesiąc",
      ],
      "B",
      "Nie czekasz na nowy tydzień. Następna scena tego dnia może znowu być calem.",
    ),
    q(
      "Po co jest kurs w dniu wpadki?",
      [
        "Żeby wystawić ocenę",
        "Żeby było dokąd wrócić",
        "Żeby ukryć liczbę",
        "Żeby podnieść poprzeczkę za karę",
      ],
      "B",
      "Kurs zostaje. Wpadka nie jest końcem drogi.",
    ),
  ],
  "kierunek/tydzien": [
    q(
      "Dlaczego godzina jest złą skalą?",
      [
        "Bo w złą godzinę nic nie działa, a w dobrą już po wszystkim — obie wersje są za szybkie",
        "Bo godzin nie da się zauważyć",
        "Bo liczy się tylko rok",
        "Bo tydzień jest zawsze gorszy niż godzina",
      ],
      "A",
      "Tydzień mieści fale i ciche poprawy. Godzina kłamie w obie strony.",
    ),
    q(
      "Jak często zmieniać krok przez siedem dni?",
      [
        "Co dwa dni, żeby nie było nudno",
        "Nie zmieniać, chyba że jest za duży",
        "Codziennie większy",
        "Wcale go nie powtarzać",
      ],
      "B",
      "Powtarzalność jest skalą Kaizen. Nowy plan co dwa dni zaciera ślad.",
    ),
    q(
      "Jedno zdanie na koniec tygodnia dotyczy…",
      [
        "Tego, co zostało łatwiejsze i który adres papierosa nadal stoi",
        "Tylko tego, ile razy było wstyd",
        "Porównania z innymi ludźmi",
        "Obietnicy skoku na kolejny tydzień",
      ],
      "A",
      "Dwie informacje: co zelżało i gdzie dym ma jeszcze adres. Bez nowej przysięgi.",
    ),
  ],
  "kierunek/pieniadze": [
    q(
      "Czym są złotówki z niezapalonych papierosów?",
      [
        "Nagrodą za charakter",
        "Cichym licznikiem skali, obok dni i oddechów",
        "Powodem ważniejszym niż Ikigai",
        "Karą, gdy dzień się posypie",
      ],
      "B",
      "Pieniądz pokazuje skalę. Powodem zostaje rzecz, którą chcesz ochronić.",
    ),
    q(
      "Czego pieniądz nie zastępuje?",
      [
        "Lustra",
        "Powodu, dla którego wstajesz",
        "Śladu po kilku papierosach",
        "Małego kroku",
      ],
      "B",
      "Ikigai zostaje powodem. Kwota jest pomocnicza.",
    ),
    q(
      "Gdy dzień się posypie, z pieniędzmi w głowie robisz…",
      [
        "Odbierasz sobie cały tydzień",
        "Liczysz to, czego nie było, i idziesz dalej",
        "Podnosisz cenę paczki w myślach za karę",
        "Przestajesz patrzeć na liczby na zawsze",
      ],
      "B",
      "Nie płacisz sobie wstydem. Licznik zostaje lustrem.",
    ),
  ],
};

const MODULE = {
  kaizen: [
    q(
      "Który plan jest najbliższy Kaizen z modułu 1?",
      [
        "Od jutra ani jednego, inaczej tydzień się nie liczy",
        "Przy jednej codziennej scenie robię jedną rzecz inaczej",
        "Skreślam dzień po każdym papierosie",
        "Zmieniam krok codziennie na większy",
      ],
      "B",
      "Jedna scena, jedna zmiana, powtarzana. Reszta to skok albo kara.",
    ),
    q(
      "Pętla nawyku w module 1 to…",
      [
        "Sygnał, sięgnięcie, ulga",
        "Wstyd, kara, poniedziałek",
        "Cena, seria, opinia",
        "Sen, głód, pieniądze",
      ],
      "A",
      "Nazwana pętla pokazuje, gdzie wstawić cal. Reszta listy to inne moduły albo ślepe uliczki.",
    ),
    q(
      "Zdanie „będę silniejszy”…",
      [
        "Jest wystarczającym krokiem na dziś",
        "Nie jest krokiem, bo nie da się go sprawdzić",
        "Zastępuje licznik",
        "Jest definicją Kaizen",
      ],
      "B",
      "Krok ma gdzie, kiedy i co inaczej. Hasło nie.",
    ),
    q(
      "Licznik na starcie kursu ma być…",
      [
        "Wyrokiem",
        "Lustrem: papierosy i złapane momenty",
        "Porównaniem z innymi",
        "Pusty, bo liczby szkodzą",
      ],
      "B",
      "Dwie liczby wystarczą. Kara zaciemnia dane.",
    ),
    q(
      "Po wpadce w duchu modułu 1…",
      [
        "Czekasz do poniedziałku z większym zakazem",
        "Zapisujesz scenę i wracasz do tego samego cala",
        "Uznajesz, że charakter zawiódł",
        "Podnosisz poprzeczkę tego samego dnia",
      ],
      "B",
      "Ślad zostaje, kurs zostaje, krok zostaje ten sam.",
    ),
  ],
  ikigai: [
    q(
      "Ikigai w tym module to przede wszystkim…",
      [
        "Plakat z hasłem",
        "Jedno własne zdanie o tym, co chcesz odzyskać z dnia",
        "Test, który trzeba zdać na cztery odpowiedzi",
        "Zakaz przerw",
      ],
      "B",
      "Cztery pytania prowadzą do jednego konkretu, nie do dekoracji.",
    ),
    q(
      "Papieros wobec pauzy…",
      [
        "Często zajął miejsce, które miało być twoje",
        "Nie ma z pauzą nic wspólnego",
        "Jest jedyną legalną przerwą",
        "Zastępuje powód, więc można go zostawić",
      ],
      "A",
      "Mały krok oddaje przerwę jednej czynności, którą naprawdę lubisz.",
    ),
    q(
      "Lepszy powód na szóstą rano to…",
      [
        "„Dla zdrowia” bez obrazu",
        "„Najpierw słyszę oddech, zanim cokolwiek zapalę”",
        "Cytat, który dobrze brzmi",
        "Porównanie z kimś innym",
      ],
      "B",
      "Konkret da się zrobić półprzytomnym. Szerokie hasło odpada.",
    ),
    q(
      "Kotwica Ikigai w kursie jest…",
      [
        "Jedną rzeczą, na przykład schodami albo wieczorem bez dymu w kurtce",
        "Listą dziesięciu misji",
        "Regulaminem",
        "Obietnicą pełni od jutra",
      ],
      "A",
      "Jedna rzecz. Przy fali wracasz do niej, nie do regulaminu.",
    ),
    q(
      "Co wystarczy, żeby uznać poranek za małe Ikigai?",
      [
        "Cały dzień bez pośpiechu",
        "Pierwsza czynność, która nie jest automatycznym dymem",
        "Brak jakiejkolwiek ochoty",
        "Idealna dieta od rana",
      ],
      "B",
      "Start dnia wraca do ciebie o jeden gest. Reszta może dojść później.",
    ),
  ],
  ochota: [
    q(
      "Fala ochoty opada…",
      [
        "Tylko jeśli ją spełnisz",
        "Także wtedy, gdy jej nie posłuchasz",
        "Dopiero po miesiącu",
        "Nigdy, więc nie ma sensu czekać",
      ],
      "B",
      "Szczyt mija. Spełnienie nie jest warunkiem końca fali.",
    ),
    q(
      "Dziesięć oddechów stoi…",
      [
        "Zamiast całego kursu",
        "Między sygnałem a decyzją",
        "Tylko w idealnej ciszy",
        "Po tym, jak już zapaliłeś, jako kara",
      ],
      "B",
      "To cal w środku pętli. Jeśli potem i tak zapalisz, pauza nadal się liczy.",
    ),
    q(
      "Zdanie na trudną minutę ma być…",
      [
        "Długie i cudze",
        "Krótkie, twoje i znajome z łatwych dni",
        "Inne za każdym razem",
        "Powtarzane wyłącznie w kryzysie",
      ],
      "B",
      "Znajome własne zdanie zostaje, gdy argumenty już nie wchodzą.",
    ),
    q(
      "Nazwanie fali…",
      [
        "Gasi ją od razu",
        "Odbiera jej rangę rozkazu",
        "Jest wstydem",
        "Zastępuje oddech",
      ],
      "B",
      "„To ochota, nie polecenie” nie obiecuje komfortu. Oddaje wybór.",
    ),
    q(
      "Czego lekcja nie obiecuje w szczycie?",
      [
        "Że da się zostać przy fali przez jej środek",
        "Że będzie przyjemnie",
        "Że fala jest krótsza niż opowieść o całym wieczorze",
        "Że wolno ją nazwać",
      ],
      "B",
      "Komfort nie jest warunkiem. Zostanie przy środku fali — tak.",
    ),
  ],
  miejsca: [
    q(
      "Kawa i papieros w tej lekcji to…",
      [
        "Dwie osobne, niezwiązane rzeczy od zawsze",
        "Jeden gest, który da się rozsunąć o połowę kubka",
        "Powód, żeby odstawić picie",
        "Coś, czego nie należy ruszać, bo rytuał jest święty w całości",
      ],
      "B",
      "Para zostaje napojem. Dym przestaje być dokończeniem łyka.",
    ),
    q(
      "Przerwa bez dymu…",
      [
        "Przestaje być przerwą",
        "Nadal jest przerwą; najpierw zostawiasz samo wyjście",
        "Jest dozwolona tylko po pracy",
        "Wymaga nowego zadania przy biurku",
      ],
      "B",
      "Prawo do wyjścia nie zależy od papierosa. Puste ręce warto zająć kubkiem.",
    ),
    q(
      "Adres wieczornego papierosa…",
      [
        "Jest ogólnym stresem",
        "Da się nazwać: próg, klatka, zakręt",
        "Nie istnieje, jeśli palisz „mało”",
        "Zmienia się co godzinę, więc nie warto go znać",
      ],
      "B",
      "Konkretne miejsce. Jedna linia albo jeden zakręt, nie sieć zakazów.",
    ),
    q(
      "Inne miejsce na kubek działa, bo…",
      [
        "Ciało gubi stary adres gestu",
        "Kawa ma wtedy więcej kofeiny",
        "To kara za rytuał",
        "Miejsce nie ma znaczenia",
      ],
      "A",
      "Ten sam napój, dwa kroki dalej. Rytuał zostaje, automat traci adres.",
    ),
    q(
      "Linia progu na kilka dni oznacza…",
      [
        "Zakaz wchodzenia do domu",
        "Jedną umowę, po której stronie drzwi decyzja jest osobna",
        "Palenie tylko w domu",
        "Zmianę pracy",
      ],
      "B",
      "Jedna linia. Stronę wybierasz według trudniejszego adresu.",
    ),
  ],
  cialo: [
    q(
      "Głośna pierwsza doba oznacza…",
      [
        "Koniec planu",
        "Brak znanego gestu, nie próbkę całego roku",
        "Że trzeba od razu „wcale”",
        "Że moduł o ochocie nie dotyczy ciała",
      ],
      "B",
      "Komunikat, nie wyrok. Zostaw wczorajszy cal.",
    ),
    q(
      "Poszarpany sen…",
      [
        "Kasuje kierunek",
        "Bywa krótki, bo nikotyna była w rytmie; nie dokładaj nocnego zakazu obok linii progu",
        "Jest powodem, żeby palić „tylko na sen”",
        "Wymaga diety od północy",
      ],
      "B",
      "Niewygoda nocy jest częsta. Wieczorny papieros to często ten sam próg.",
    ),
    q(
      "Ssanie, które bierzesz za ochotę, najpierw sprawdzasz…",
      [
        "Paczką",
        "Szklanką wody",
        "Porównaniem z innymi",
        "Głodówką",
      ],
      "B",
      "Czasem to pragnienie albo głód. Woda jest tańszym sprawdzeniem.",
    ),
    q(
      "Cichą poprawę…",
      [
        "Warto zapisać, bo kryzys i tak krzyczy głośniej",
        "Ignorujesz, żeby nie zapeszyć",
        "Traktujesz jako znak do skoku „od dziś wcale”",
        "Uznajesz za mniej ważną niż wstyd",
      ],
      "A",
      "Schody, kawa, oddech rano. To dane Ikigai, nie ozdoba.",
    ),
    q(
      "Gdy jest lżej, moduł radzi…",
      [
        "Podnieść poprzeczkę tego samego dnia",
        "Zostać przy calu jeszcze kilka dni",
        "Przestać notować",
        "Zmieniać krok codziennie",
      ],
      "B",
      "Stałość, nie skok. Lżej nie jest sygnałem, że już po wszystkim.",
    ),
  ],
  kierunek: [
    q(
      "Jeden papieros po kilku dniach to…",
      [
        "Tożsamość: „znowu palę”",
        "Zdarzenie w konkretnej scenie",
        "Dowód, że tydzień się nie liczy",
        "Koniec kursu",
      ],
      "B",
      "Fakt da się wpisać. Zdanie o tym, kim jesteś, kasuje tydzień.",
    ),
    q(
      "Skala, która mieści fale i ciche poprawy, to…",
      [
        "Najgłośniejsza godzina",
        "Tydzień tego samego cala",
        "Pięć minut wstydu",
        "Cudzy rok",
      ],
      "B",
      "Godzina kłamie w obie strony. Siedem dni pokazuje, czy cal stoi.",
    ),
    q(
      "Pieniądze z paczki…",
      [
        "Zastępują Ikigai",
        "Pokazują skalę i nie są karą za zły dzień",
        "Trzeba je sobie odebrać po wpadce",
        "Nie mają związku z papierosami",
      ],
      "B",
      "Lustro pomocnicze. Powód zostaje ten, dla którego wstajesz.",
    ),
    q(
      "Powrót po wpadce jest…",
      [
        "W następnej scenie tego samego dnia",
        "Dopiero w poniedziałek",
        "Po egzaminie",
        "Niemożliwy",
      ],
      "A",
      "Kurs jest po to, żeby było dokąd wrócić od razu.",
    ),
    q(
      "Przez siedem dni krok…",
      [
        "Zmieniasz co dwa dni",
        "Zostawiasz, chyba że jest za duży",
        "Podwajasz codziennie",
        "Ukrywasz, żeby nie nudził",
      ],
      "B",
      "Powtarzalność jest treścią ostatniego modułu. Nowość co dwa dni zaciera ślad.",
    ),
  ],
};

export const EXAM = [
  q(
    "Kaizen w ZeroDymu to…",
    [
      "Skok „od jutra zero”",
      "Cal, który mieści się w gorszy dzień i da się go powtórzyć",
      "Kara za każdy papieros",
      "Zmiana całego życia jednego ranka",
    ],
    "B",
    "Mały krok nie wymaga formy. Dlatego przeżywa czwartek.",
  ),
  q(
    "Pierwsza scena kursu powinna być…",
    [
      "Codzienna i konkretna",
      "Jak najrzadsza, żeby było uroczyście",
      "Bez miejsca",
      "Od razu całodobowa",
    ],
    "A",
    "Kawa, próg, przerwa. Adres, nie hasło.",
  ),
  q(
    "Ikigai na szóstą rano działa, gdy jest…",
    [
      "Szerokim hasłem o zdrowiu",
      "Jednym obrazem, który da się zrobić od razu",
      "Cytatem",
      "Listą dziesięciu celów",
    ],
    "B",
    "Konkret wygrywa z plakatem, gdy jesteś półprzytomny.",
  ),
  q(
    "Fala ochoty…",
    [
      "Jest rozkazem",
      "Mija także bez spełnienia",
      "Trwa cały dzień bez spadku",
      "Znika tylko po papierosie",
    ],
    "B",
    "Zostajesz przy środku fali. Nie musisz jej posłuchać, żeby opadła.",
  ),
  q(
    "Dziesięć oddechów po tym, jak i tak zapaliłeś…",
    [
      "Nie liczy się",
      "Liczy się jako przerwany automat",
      "Kasuje moduł",
      "Jest dozwolone tylko przed egzaminem",
    ],
    "B",
    "Pauza jest treningiem niezależnie od późniejszej decyzji.",
  ),
  q(
    "Kawa w module o miejscach…",
    [
      "Ma zniknąć razem z papierosem",
      "Zostaje, a dym przestaje być dokończeniem łyka",
      "Jest zakazana do końca kursu",
      "Nie łączy się z nawykiem",
    ],
    "B",
    "Rytuał zostaje. Para zostaje rozsunięta o cal.",
  ),
  q(
    "Głośna pierwsza doba…",
    [
      "Jest próbką całego roku",
      "Jest komunikatem, że zniknął znany gest",
      "Wymaga większego skoku",
      "Kończy liczenie",
    ],
    "B",
    "Nie dokładaj opowieści „tak już będzie zawsze”. Zostaw wczorajszy cal.",
  ),
  q(
    "Po jednym papierosie bliższe prawdzie jest…",
    [
      "„Znowu jestem palaczem”",
      "„W tej scenie zapaliłem”",
      "„Tydzień skreślony”",
      "„Małe kroki odpadają”",
    ],
    "B",
    "Zdarzenie wraca do licznika. Tożsamość nie.",
  ),
  q(
    "Dobra skala postępu to…",
    [
      "Najgłośniejsza godzina",
      "Tydzień tego samego cala",
      "Cudzy wynik",
      "Sam wstyd",
    ],
    "B",
    "Tydzień mieści fale i ciche poprawy.",
  ),
  q(
    "Pieniądze z paczki w kursie…",
    [
      "Zastępują powód, dla którego wstajesz",
      "Są pomocniczym lustrem skali",
      "Trzeba je sobie zabrać po wpadce",
      "Nie wynikają z papierosów",
    ],
    "B",
    "Kwota pokazuje skalę. Ikigai zostaje powodem.",
  ),
];

export function lessonQuiz(moduleId, lessonId) {
  return LESSON[`${moduleId}/${lessonId}`] || null;
}

export function moduleQuiz(moduleId) {
  return MODULE[moduleId] || null;
}

export function passMark(kind) {
  if (kind === "lekcja") return 2;
  if (kind === "modul") return 4;
  return 7;
}
