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
	btnGroup
/** */



export default class extends Phaser.State {
  init() { }
  
  tileClickListener(tile, evt){
  	selectedTile = tile.myId
  	tiles.forEach(e => e.forEach(f => f.inputEnabled = false))
  	btnGroup.children.forEach(e => e.scale.set(1))
  	console.log(selectedTile)
  }
  
  closeClickListener(tile, evt){
  	selectedTile = ''
  	tiles.forEach(e => e.forEach(f => f.inputEnabled = true))
  	btnGroup.children.forEach(e => e.scale.set(0))
  }

  buttonClickListener(button){
  	btnGroup.children.forEach(e => e.scale.set(0))
  }
  buttonUpListener(button){
  	btnGroup.children.forEach(e => e.scale.set(1))
  }
  
  preload() { 
	this.game.load.image('map', '../../assets/images/earth_map.jpg')
	this.game.load.image('boundingBox', '../../assets/images/bound.png')
	this.game.load.image('popupBox', '../../assets/images/popup.png')
	this.game.load.image('button', '../../assets/images/button_small.png')
	this.game.load.image('close', '../../assets/images/close.png')
	data.earthEvents.forEach(e => {
		this.game.load.image(e.name, '../../assets/images/' + e.sprite)
	})

  }

  create() {
	var background = this.game.add.tileSprite(0, 0, 1280, 720, 'map')

	
	for(let i = 0; i < 9; i++){ tiles.push([]) }
	
	for(let i=0;i<9;i++){
	    for(let j=0;j<16;j++){
			tiles[i][j] = this.game.add.sprite(j * w, i * h, 'boundingBox')			
			tiles[i][j].inputEnabled = true			
			tiles[i][j].myId = [i, j]			
			tiles[i][j].events.onInputDown.add(this.tileClickListener, this)
		}

	}
	btnGroup = game.add.group()

	let i = 0,
		offsetY1 = -135,
		offsetY2 = -135

	let closeBtn = this.game.add.sprite((1280 - 50), 50, 'close')
	closeBtn.anchor.set(0.5)
	btnGroup.add(closeBtn)
	closeBtn.inputEnabled = true
	closeBtn.events.onInputDown.add(this.closeClickListener, this)
	
	data.earthEvents.forEach(e => {
		if(i < 4){
			let btn = this.game.add.sprite(game.world.centerX - 145, game.world.centerY + offsetY1, 
				'button')
			btn.inputEnabled = true
			btn.events.onInputDown.add(this.buttonClickListener, this)
			btn.events.onInputUp.add(this.buttonUpListener, this)
			let tx = this.game.add.text(game.world.centerX - 260, game.world.centerY + (offsetY1 - 30), e.name, 5)
			btn.anchor.set(0.5)
			offsetY1 += 90
			btnGroup.add(btn)			
			btnGroup.add(tx)			
		}else{
			let btn = this.game.add.sprite(game.world.centerX + 145, game.world.centerY + offsetY2, 
				'button')
			btn.inputEnabled = true
			btn.events.onInputDown.add(this.buttonClickListener, this)
			btn.events.onInputUp.add(this.buttonUpListener, this)
			let tx = this.game.add.text(game.world.centerX + 40, game.world.centerY + (offsetY2 - 30), e.name)
			btn.anchor.set(0.5)
			offsetY2 += 90
			btnGroup.add(btn)
			btnGroup.add(tx)
		}
		i++
	})

    /*this.mushroom = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.game.add.existing(this.mushroom)*/
    btnGroup.children.forEach(e => e.scale.set(0))
  }

  render() {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }

  }
}
