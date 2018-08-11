export default {
	'areas' : [
		{
			'type' : 'landlock'	
		},
		{
			'type' : 'seaside'
		}
	],
	
	'earthEvents' : [
		{
			'name' : 'epidemic',
			'cooldown' : 30000,
			'humanCost' : 0.25,
			'buildingCost': 0
		},
		{
			'name' : 'earthquake',
			'cooldown' : 120000,
			'humanCost' : 0.25,
			'buildingCost' : 0.75
		},
		{
			'name' : 'volcanic eruption',
			'cooldown' : 300000,
			'humanCost' : 1,
			'buildingCost' : 1
		}
	]
}
