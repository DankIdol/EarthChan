export default {
  'areas' : [
    {
      'type' : 'landlock',
      'events' : [
      	'epidemic',
      	'earthquake',
      	'volcanic eruption',
      	'tornado'
      ]
    },
    {
    	'type' : 'seaside',
    	'events' : [
	    	'epidemic',
	    	'earthquake',
	    	'tornado',
	    	'tsunami',
	    	'hurricane'
    	]
    },
    {
    	'type' : 'desert',
	    'events' : [
	    	'epidemic',
	    	'earthquake',
	    	'volcanic eruption',
	    	'drought'
    	]
    },
    {
    	'type' : 'water'
    }
  ],
  
  'earthEvents' : [
    {
      'name' : 'epidemic',
      'cooldown' : 30000,
      'humanCost' : 0.25,
      'buildingCost': 0,
      'sprite': 'poisoncloud.png',
      'timer': false
    },
    {
      'name' : 'earthquake',
      'cooldown' : 120000,
      'humanCost' : 0.25,
      'buildingCost' : 0.75,
      'sprite': 'smoke.png', // FIXME
      'timer': false
    },
    {
      'name' : 'volcanic eruption',
      'cooldown' : 300000,
      'humanCost' : 1,
      'buildingCost' : 1,
      'sprite': 'lava.png',
      'timer': false
    },
    {
      'name' : 'tsunami',
      'cooldown' : 240000,
      'humanCost' : 0.75,
      'buildingCost' : 0.75,
      'timer': false,
      'sprite': 'waves.png'
    },
    {
      'name' : 'flood',
      'cooldown' : 90000,
      'humanCost' : 0.26,
      'buildingCost' : 0.25,
      'sprite': 'waves.png',
      'timer': false
    },
    {
      'name' : 'drought',
      'cooldown' : 20000,
      'humanCost' : 0.20,
      'buildingCost' : 0,
      'sprite': 'drought.png',
      'timer': false
    },
    {
      'name' : 'tornado',
      'cooldown' : 50000,
      'humanCost' : 0.10,
      'buildingCost' : 0.40,
      'sprite': 'tornado.png',
      'timer': false
    },
    {
      'name' : 'hurricane',
      'cooldown' : 120000,
      'humanCost' : 0.50,
      'buildingCost' : 0.50,
      'sprite': 'tornado.png',
      'timer': false
    }
  ]
}
