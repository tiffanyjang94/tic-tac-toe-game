import { Component } from '@angular/core';

enum Letter {
  PLAYER_O = 'O',
  PLAYER_X = 'X',
  EMPTY_SLOT = '',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /** Stores the letter on the board */
  currentLettersOnBoard = [];

  currentPlayer = Letter.PLAYER_O;

  hasPlayerWon = false;

  constructor(){
    for(let i = 0; i < 3; i++){ // For each row
      let rowArr = [];
      for(let j = 0; j < 3; j++){ // For each col
        rowArr.push(Letter.EMPTY_SLOT)
      }
      // rowArr = ["", "", ""]
      this.currentLettersOnBoard.push(rowArr);
    }
  }

  handleBlockClick(row, col){
    /** Check if box has already been clicked */
    if(this.currentLettersOnBoard[row][col] != Letter.EMPTY_SLOT){
      alert('Pick an empty box.');
      return;
    }

      this.currentLettersOnBoard[row][col] = this.currentPlayer;
      if(this.checkHasPlayerWon(row, col)){
        setTimeout(() => alert('You won!'), 0); // asynchronous function
      }
      this.updateCurrentPlayer();
  }

  private updateCurrentPlayer(){
    if(this.currentPlayer === Letter.PLAYER_X){
      this.currentPlayer = Letter.PLAYER_O;
    } else{
      this.currentPlayer = Letter.PLAYER_X;
    }
  }

  private checkHasPlayerWon(row, col){
    // Check if row has all same letter
    if(this.rowContainsOnlyPlayer(row)||
      this.colContainsOnlyPlayer(col) ||
      this.leftDiagContainsOnlyPlayer() ||
      this.rightDiagContainsOnlyPlayer()
    ){
      return true;
    }
    return false;
  }

  private rowContainsOnlyPlayer(row){
    for(let i = 0; i < this.currentLettersOnBoard.length; i++){
      if(this.currentLettersOnBoard[row][i] !== this.currentPlayer){
        return false;
      }
    }
    return true;
  }

  private colContainsOnlyPlayer(col){
    for(let i = 0; i < this.currentLettersOnBoard.length; i++){
      if(this.currentLettersOnBoard[i][col] !== this.currentPlayer){
        return false;
      }
    }
    return true;
  }

  private leftDiagContainsOnlyPlayer(){
    for(let i = 0; i < this.currentLettersOnBoard.length; i++){
      if(this.currentLettersOnBoard[i][i] !== this.currentPlayer){
        return false;
      }
    }
    return true;
  }

  private rightDiagContainsOnlyPlayer(){
    for(let i = 0; i < this.currentLettersOnBoard.length; i++){
      const diagCol = this.currentLettersOnBoard.length - 1 - i;
      if(this.currentLettersOnBoard[i][diagCol] !== this.currentPlayer){
        return false;
      }
    }
    return true;
  }
}

/**
u can use *ngIf inside a new dom tag to see if u want to render a div element based on hasPlayerWon
declare hasPlayerWon as a class property initialzed to = false
create a function called checkHasPlayerWon() and call it after this.updateCurrentPlayer() */
