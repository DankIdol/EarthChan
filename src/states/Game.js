/* globals __DEV__ */
import Phaser from 'phaser'
import data from '../data/data.js'
import vars from '../currentVars.js'
import tileData from '../data/tileInfo.js'

import Mushroom from '../sprites/Mushroom'

/** VARIABLES */
var w = 1280/16,
  h = 720/9,
  tiles = [],
  popup,
  selectedTile,
  btnGroup,
  arrowGroup,
  selectedArrow,
  selectedAction,
  selectedCd,
  showArrows = false,
  mood = 'neutral',
  fontStyle,
  cooldownText = [],
  totalPopulation
/** */



export default class extends Phaser.State {
  init() { }

  tileClickListener(tile, evt){
    selectedTile = tile.myId
    tiles.forEach(e => e.forEach(f => f.inputEnabled = false))
    btnGroup.children.forEach(e => e.scale.set(1))
    tiles[selectedTile[0]][selectedTile[1]].tint = 0x00eeff
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
    selectedAction = button.action.sprite.replace('.png','')
    selectedCd = button.action.cooldown
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
      this.playAction(selectedArrow)
    }
  }
  arrowDeSelectListener(arrow){
    if(showArrows){
      arrow.scale.set(0.5)
      selectedArrow = null
    }
  }
  arrowTriggerSelectListener(arrow){
    alert()
    if(selectedArrow != null){
      console.log(selectedArrow)
    }
  }

  playAction(direction) {
    const currentAction = selectedAction
    const currentCd = selectedCd
    let onCd = false
	console.log(currentAction)
    vars.timers.forEach(e => {
      if(e.name == currentAction){
        if(e.value != 0) onCd = true
        else e.value = e.max
      }
    })

    if(!onCd){
	    let x = (selectedTile[1])*80
	    let y = selectedTile[0]*85.3333
	    if (selectedArrow === 2) x = (selectedTile[1]-1)*80
	    else if (selectedArrow === 3) x = (selectedTile[1]+1)*80
	    else if (selectedArrow === 0) y = (selectedTile[0]-1)*85.3333
	    else if (selectedArrow === 1) y = (selectedTile[0]+1)*85.3333
	    //console.log(x, y)
	    mood.frameName = ['happy', 'wink'][Math.round(Math.random())]
	    const animSprite = this.game.add.sprite(x, y, currentAction, currentAction+'01')
	    animSprite.scale.set(0.5)
	    const interval = setInterval(() => {
	      setTimeout(() => {
	        animSprite.frameName = currentAction+'02'
	      }, 500)
	      setTimeout(() => {
	        animSprite.frameName = currentAction+'03'
	      }, 1000)
	    }, 1000)
	    setTimeout(() => {
	      mood.frameName = 'neutral'
	    }, 1000)
	    setTimeout(() => {
	      clearInterval(interval)
	      animSprite.destroy(true)
	    }, currentCd)
    }
  }

  preload() { 
    this.game.load.image('map', '../../assets/images/earth_map.jpg')
    this.game.load.image('boundingBox', '../../assets/images/bound.png')
    this.game.load.image('popupBox', '../../assets/images/popup.png')
    this.game.load.image('button', '../../assets/images/button_small.png')
    this.game.load.image('close', '../../assets/images/close.png')
    this.game.load.image('arrow', '../../assets/images/cursor.png')
    this.game.load.image('earthchan-base', '../../assets/images/earthchan-base.png')
    this.game.load.atlas('facials', '../../assets/images/facials.png', 'src/sprites/facials.json')

    data.earthEvents.forEach(e => {
      const baseName = e.sprite.replace('.png', '')
      this.game.load.atlas(baseName, '../../assets/images/' + e.sprite, 'src/sprites/'+baseName+'.json') // TODO change to atlas
    })

  }

  create() {
    var background = this.game.add.tileSprite(0, 0, 1280, 720, 'map')
    //background.tint = 0xcccccc
    fontStyle = { font: '15px monospace' }
    let earthChanBase = this.game.add.tileSprite(0, 320, 2000, 2000, 'earthchan-base')

    earthChanBase.scale.setTo(0.2,0.2)
    mood = this.game.add.sprite(110, 440, 'facials', 'neutral')
    for(let i = 0; i < 9; i++){ tiles.push([]) }

    for(let i=0;i<9;i++){
      for(let j=0;j<16;j++){
        tiles[i][j] = this.game.add.sprite(j * w, i * h, 'boundingBox')			
        			
        tiles[i][j].inputEnabled = true			
        tiles[i][j].myId = [i, j]
        tiles[i][j].myType = tileData[i][j].type
        tiles[i][j].myPopulation = tileData[i][j].population
        //this.game.add.text(j * w, i * h,tiles[i][j].myPopulation, { font: '15px', fill: 'lightgreen' })
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
        btn.action = e
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
        btn.action = e
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
      e.inputEnabled = true
      e.anchor.set(0.5)
      e.scale.set(0)
      e.input.enableDrag()
      e.events.onInputOver.add(this.arrowSelectListener, this)
      e.events.onInputOut.add(this.arrowDeSelectListener, this)
      e.events.onInputUp.add(this.arrowTriggerSelectListener, this)
    })

    btnGroup.children.forEach(e => e.scale.set(0))

    let offset = 0,
        infoFontStyle = { font: '13px monospace italic', fill: '#ffffff' }
            
    vars.timers.forEach(e => {
      let tx
      if(e.value == 0) tx = game.add.text((1280 - 150), 500 + offset, e.name + ': READY', infoFontStyle)
      else tx = game.add.text((1280 - 150), 500 + offset, e.name + ': ' + e.value, infoFontStyle)
      offset += 16
      cooldownText.push(tx)
    })
    
    totalPopulation = this.game.add.text(game.world.centerX, 700, '[*** ]', { font: '20px monospace bold', fill: '#331100'})
    totalPopulation.anchor.set(0.5)

    setInterval(() => {
      vars.timers.forEach(e => {
        if (e.value != 0){
          e.value -= 1000
        }
   	  })
    }, 1000)
    setInterval(() => {
      tiles.forEach(e=>e.forEach(el=>{
      	el.myPopulation *= Math.random() * (1.3 - 1.03) + 1.03;
      }))
    }, 3000)
  }

  render() {
    let i = 0
    vars.timers.forEach(e => {
      cooldownText[i++].text = (e.value == 0 ? (e.name + ': READY') : (e.name + ': ' + (e.value/1000) ))
    })
    totalPopulation.text = 'humans: ['
    for(let i = 0; i < vars.totalPopulation; i += 35000000){
      totalPopulation.text += '⏹'
    }
    totalPopulation.text += ']'

    let totalPopCounter = 0
    tiles.forEach(e => e.forEach(el => {
      if(el.tint != 0x00eeff) el.tint = 0xff8000
      if(el.myPopulation > 1350000) el.tint = 0xff00aa
      totalPopCounter += el.myPopulation 
    }))
    console.log(totalPopCounter)
    vars.totalPopulation = totalPopCounter
  }
}
