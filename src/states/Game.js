/* globals __DEV__ */
import Phaser from 'phaser'
import data from '../data/data.js'
import Listeners from 'events'

import Mushroom from '../sprites/Mushroom'
import lang from '../lang'

/** VARIABLES */
var w = 1280/16,
	h = 720/9,
	tiles = [],
	listeners = new Listeners(),
	popup,
	selectedTile,
	popupGroup
/** */



export default class extends Phaser.State {
  init() { }
  
  tileClickListener(tile, evt){
  	console.log('tile click')
  	selectedTile = tile.myId
  	tiles.forEach(e => e.forEach(f => f.inputEnabled = false))
  	popup.scale.set(1)
  }
  
  popupClickListener(tile, evt){
  	console.log('popup click')
  	selectedTile = ''
  	tiles.forEach(e => e.forEach(f => f.inputEnabled = true))
    popup.scale.set(0)
  }

  buttonClick(){
  	
  }
  
  preload() { 
	this.game.load.image('map', '../../assets/images/earth_map.jpg')
	this.game.load.image('boundingBox', '../../assets/images/bound.png')
	this.game.load.image('popupBox', '../../assets/images/popup.png')
	this.game.load.image('button', '../../assets/images/button.png')
	data.earthEvents.forEach(e => {
		this.game.load.image(e.name, '../../assets/images/' + e.sprite)
	})
  }

  create() {
	this.game.add.tileSprite(0, 0, 1280, 720, 'map')
	
	for(let i = 0; i < 9; i++){ tiles.push([]) }
	
	for(let i=0;i<9;i++){
	    for(let j=0;j<16;j++){
			tiles[i][j] = this.game.add.sprite(j * w, i * h, 'boundingBox')			
			tiles[i][j].inputEnabled = true			
			tiles[i][j].myId = [i, j]			
			tiles[i][j].events.onInputDown.add(this.tileClickListener, this)
		}

	}
	popupGroup = game.add.group()
	
	popup = this.game.add.sprite(game.world.centerX, game.world.centerY, 'popupBox')
	popup.anchor.set(0.5)
	popup.scale.set(0)
	popup.inputEnabled = true
	popup.events.onInputDown.add(this.popupClickListener, this)

	let i = 0
	data.earthEvents.forEach(e => {
		let btn = this.game.make.button(100, 100, 'button', this.buttonClick, this, 2, 1, 0)
		this.game.add.text(i, i, e.name)
		i+=30
	})

	popupGroup.add(popup)

    /*this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)*/
  }

  render() {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }

  }
}
