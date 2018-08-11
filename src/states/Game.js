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
	btnGroup,
	arrowGroup,
	selectedArrow,
	showArrows = false
/** */



export default class extends Phaser.State {
  init() { }
  
  tileClickListener(tile, evt){
  	selectedTile = tile.myId
  	tiles.forEach(e => e.forEach(f => f.inputEnabled = false))
  	btnGroup.children.forEach(e => e.scale.set(1))
  	tiles[selectedTile[0]][selectedTile[1]].tint = 0x00ffff
  }
  
  closeClickListener(tile, evt){
  	showArrows = false
  	tiles[selectedTile[0]][selectedTile[1]].tint = 0xff8000
  	selectedTile = ''
  	tiles.forEach(e => e.forEach(f => f.inputEnabled = true))
  	btnGroup.children.forEach(e => e.scale.set(0))
  }

  buttonClickListener(button){
	showArrows = true
  	btnGroup.children.forEach(e => e.scale.set(0))
  	arrowGroup.children.forEach(e => e.scale.set(0.5))
  }
  buttonUpListener(button){
  	showArrows = false
  	btnGroup.children.forEach(e => e.scale.set(1))
  	arrowGroup.children.forEach(e => e.scale.set(0))
  }
  arrowSelectListener(arrow){
  	if(showArrows){
  		arrow.scale.set(0.6)
  		selectedArrow = arrow.facing
  	}
  }
  arrowDeSelectListener(arrow){
	if(showArrows){
    	arrow.scale.set(0.5)
    	selectedArrow = null
    }
  }
  arrowTriggerSelectListener(arrow){
      if(selectedArrow != null){
      	console.log(selectedArrow)
      }
  }
    
  preload() { 
	this.game.load.image('map', '../../assets/images/earth_map.jpg')
	this.game.load.image('boundingBox', '../../assets/images/bound.png')
	this.game.load.image('popupBox', '../../assets/images/popup.png')
	this.game.load.image('button', '../../assets/images/button_small.png')
	this.game.load.image('close', '../../assets/images/close.png')
	this.game.load.image('arrow', '../../assets/images/cursor.png')
	data.earthEvents.forEach(e => {
		this.game.load.image(e.name, '../../assets/images/' + e.sprite)
	})

  }

  create() {
	var background = this.game.add.tileSprite(0, 0, 1280, 720, 'map')
	var fontStyle = { font: '15px monospace'}
	
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
		offsetY1 = -140,
		offsetY2 = -140

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
			let tx = this.game.add.text(game.world.centerX - 260, game.world.centerY + (offsetY1 - 25), 
				e.name + '\nCD: ' + (e.cooldown/60000).toFixed(1) + 
				'm HE: ' + e.humanCost + ' BE: ' + e.buildingCost, fontStyle)
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
			let tx = this.game.add.text(game.world.centerX + 30, game.world.centerY + (offsetY2 - 30),
				e.name + '\nCD: ' + (e.cooldown/60000).toFixed(1) + 
				'm HE: ' + e.humanCost + ' BE: ' + e.buildingCost, fontStyle)
			btn.anchor.set(0.5)
			offsetY2 += 90
			btnGroup.add(btn)
			btnGroup.add(tx)
		}
		i++
	})

	arrowGroup = game.add.group()
	let arrowUp = this.game.add.button(game.world.centerX, game.world.centerY - 200, 'arrow', null, this,2,1,0)
	arrowUp.facing = 0
	
	let arrowDown = this.game.add.button(game.world.centerX, game.world.centerY + 200, 'arrow', null, this,2,1,0)
	arrowDown.angle += 180
	arrowDown.facing = 1
	
	let arrowLeft = this.game.add.button(game.world.centerX - 400, game.world.centerY, 'arrow', null, this,2,1,0)
	arrowLeft.angle -= 90
	arrowLeft.facing = 2
	
	let arrowRight = this.game.add.button(game.world.centerX + 400, game.world.centerY, 'arrow', null, this,2,1,0)
	arrowRight.angle += 90
	arrowRight.facing = 3
	
	arrowGroup.add(arrowUp)
	arrowGroup.add(arrowDown)
	arrowGroup.add(arrowLeft)
	arrowGroup.add(arrowRight)
	arrowGroup.children.forEach(e => {
		e.anchor.set(0.5)
		e.scale.set(0)
		e.events.onInputOver.add(this.arrowSelectListener, this)
		e.events.onInputOut.add(this.arrowDeSelectListener, this)
		e.events.onInputUp.add(this.arrowTriggerSelectListener, this)
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
