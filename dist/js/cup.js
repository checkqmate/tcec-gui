var roundDate = [];
/* All times in GST, maintain proper formatting, if date is not decide just put 0 */
var roundDateMan = [
0, /* 1 */
0, /* 2 */
0, /* 3 */
0, /* 4 */
0, /* 5 */
0, /* 6 */
0, /* 7 */
0, /* 8 */
0, /* 9 */
0, /* 10 */
0, /* 11 */
0, /* 12 */
0, /* 13 */
0, /* 14 */
0, /* 15 */
0, /* 16 */
0, /* 17 */
0, /* 18 */
0, /* 19 */
0, /* 20 */
'23:45 on 2018.10.15', /* 21 */
'05:15 on 2018.10.15', /* 22 */
'23:45 on 2018.10.16', /* 23 */
'05:15 on 2018.10.16', /* 24 */
0, /* 25 */
0, /* 26 */
0, /* 27 */
0, /* 28 */
0, /* 29 */
0, /* 30 */
0, /* 31 */
0, /* 32 */
0, /* 33 */
0, /* 34 */
];

var startDateR1 = '12:30:00 on 2018.10.05';
var startDateR2 = '18:00:00 on 2018.10.05';
var roundNo = 2;
var teamsx = 
     [[["Stockfish 270918", 1], ["Ivanhoe 999946h", 32]],
      [["Gull 180521", 17], ["Texel 1.08a11", 16]],
      [["Fizbo 2", 9], ["Hannibal 20180922", 24]],
      [["Chiron S13.2", 8], ["Nemorino 5.05", 25]],
      [["Fire 7.1", 4], ["Senpai 2.0", 29]],
      [["Vajolet2 2.6.1", 20], ["Booot 6.3.1", 13]],
      [["Laser 250918", 12], ["Lc0 18.11248", 21]],
      [["Ethereal 11.06", 5], ["Rodent III 1.0.171",28]],
      [["Komodo 2135.10", 2], ["Tucano 7.06", 31]],
      [["Xiphos 0.4.2", 15], ["Nirvana 2.4", 18]],
      [["Fritz 16.10", 10], ["DeusX 1.1", 23]],
      [["Ginkgo 2.12", 7], ["Bobcat 8", 26]],
      [["Houdini 6.03", 3], ["chess22k 1.11", 30]],
      [["ChessBrainVB 3.70", 14], ["Arasan TCEC13.2", 19]],
      [["Jonny 8.1", 11], ["Pedone 1.9", 22]],
      [["Andscacs 094030", 6], ["Wasp 3.3", 27]]
  ];

var bigData = {                                                                                                                                                                              
  teams : [                                                                                                                                                                                  
  ],                                                                                                                                                                                         
  results : [[ /* WINNER BRACKET */                                                                                                                                                          
    [[0,0, "empty-bye"], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0, "arun"], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
    [[0,0, "arun"], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],                                                                                                                        
    [[0,0], [0,0], [0,0], [0,0]],                                                                                                                                                            
    [[0,0], [0,0]],                                                                                                                                                                          
    [[0,0]]                                                                                                                                                                                  
  ]                                                                                                                                                                                          
  ]                                                                                                                                                                                          
}                                                                                                                                                                                        

var roundResults = []

var dummyCross = 
{
	"Event" : "",
	"Order" : [
		"Engine1",
		"Engine2"
	],
	"Table" : {
		"Engine1" : {
			"Abbreviation" : "E1",
			"Elo" : 0,
			"Games" : 0,
			"GamesAsBlack" : 0,
			"GamesAsWhite" : 0,
			"Neustadtl" : 0,
			"Performance" : 0,
			"Rank" : 1,
			"Rating" : 0,
			"Results" : {
				"Engine2" : {
					"Scores" : [],
					"Text" : ""
				}
			},
			"Score" : 0,
			"Strikes" : 0,
			"WinsAsBlack" : 0,
			"WinsAsWhite" : 0
		},
		"Engine2" : {
			"Abbreviation" : "E2",
			"Elo" : 0,
			"Games" : 0,
			"GamesAsBlack" : 0,
			"GamesAsWhite" : 0,
			"Neustadtl" : 0,
			"Performance" : 0,
			"Rank" : 2,
			"Rating" : 0,
			"Results" : {
				"Engine1" : {
					"Scores" : [],
					"Text" : ""
				}
			},
			"Score" : 0,
			"Strikes" : 0,
			"WinsAsBlack" : 0,
			"WinsAsWhite" : 0
		}
	}
}
