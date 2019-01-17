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
0, /* 15 */
0, /* 16 */
0, /* 17 */
0, /* 18 */
0, /* 19 */
0, /* 19 */
0, /* 27 */
0, /* 28 */
0, /* 29 */
0, /* 30 */
0, /* 30 */
0, /* 32 */
0, /* 30 */
0, /* 34 */
];

var startDateR1 = '12:30:00 on 2019.01.21';
var startDateR2 = '18:00:00 on 2019.01.21';
var roundNo = 2;
var teamsx = 
     [[["Stockfish ", 1], ["Rodent ", 32]],
      [["Booot          ", 6], ["Nirvana ", 27]],
      [["Nemorino ", 5], ["KomodoMCTS ",28]],
      [["Fizbo ", 2], ["rofChade ", 31]],
      [["Wasp ", 8], ["Houdini ", 25]],
      [["Texel       ", 3], ["Fritz        ", 30]],
      [["Fire 7.1", 4], ["Pirarucu ", 29]],
      [["Jonny      ", 7], ["Arasan  ", 26]],
      [["Tucano ", 17], ["Lc0 ", 16]],
      [["ChessBrainVB ", 11], ["Xiphos ", 22]],
      [["Andscacs ", 12], ["Hannibal ", 21]],
      [["Chiron ", 15], ["Pedone     ", 18]],
      [["Komodo ", 9], ["Demolito ", 24]],
      [["Ginkgo           ", 14], ["Gull           ", 19]],
      [["Schooner ", 20], ["Ethereal ", 13]],
      [["Vajolet    ", 10], ["Laser    ", 23]]
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
