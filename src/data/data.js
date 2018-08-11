export default {
  'areas' : [
    {
      'type' : 'landlock'	
    },
    {
      'type' : 'seaside'
    }
  ],
  /* 
   * epidemic 30s 25% 0%
   * earthquake 120s  25% 75%
   * vulcan   300s  100%  100%
   * landslide  20s 5%  5%
   * tsunami    240s  75% 75%
   * flood    90s 25% 25%
   * drought    20s 20% 0%
   * tornado    50s 10% 40%
   * hurricane  120s  50% 50%
   * bug invasion 15s 15% 0%
   */
  'earthEvents' : [
    {
      'name' : 'epidemic',
      'cooldown' : 30000,
      'humanCost' : 0.25,
      'buildingCost': 0,
      'sprite': 'poisoncloud.png'
    },
    {
      'name' : 'earthquake',
      'cooldown' : 120000,
      'humanCost' : 0.25,
      'buildingCost' : 0.75
      'sprite': 'smoke.png' // FIXME
    },
    {
      'name' : 'volcanic eruption',
      'cooldown' : 300000,
      'humanCost' : 1,
      'buildingCost' : 1,
      'sprite': 'explosion_smone.png'
    },
    {
      'name' : 'tsunami',
      'cooldown' : 240000,
      'humanCost' : 0.75,
      'buildingCost' : 0.75,
      'sprite': 'waves.png'
    },
    {
      'name' : 'flood',
      'cooldown' : 90000,
      'humanCost' : 0.26,
      'buildingCost' : 0.25,
      'sprite': 'waves.png'
    },
    {
      'name' : 'draught',
      'cooldown' : 20000,
      'humanCost' : 0.20,
      'buildingCost' : 0,
      'sprite': 'drought.png'
    },
    {
      'name' : 'tornado',
      'cooldown' : 50000,
      'humanCost' : 0.10,
      'buildingCost' : 0.40,
      'sprite': 'tornado.png'
    },
    {
      'name' : 'hurricane',
      'cooldown' : 120000,
      'humanCost' : 0.50,
      'buildingCost' : 0.50,
      'sprite': 'hurricane.png'
    }
  ]
}
