import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCol } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true, // Garante que o componente é standalone
  imports: [IonicModule, CommonModule, FormsModule] // Adicione os módulos ao array imports
})

export class HomePage {
  displayValue: string = '';
  firstValue: number | null = null;
  operator: string | null = null;
  secondValue: number | null = null;

  numero1: number | undefined;
  numero2: number | undefined;

  constructor() {}
  appendNumber(num: string) {
    // Impede múltiplos pontos decimais
    if (num === '.' && this.displayValue.includes('.')) {
      return;
    }
    this.displayValue = `${this.displayValue}${num}`;
  }
  appendOperator(op: string) {
    if (this.displayValue === '') {
      return;
    }
    if (this.firstValue === null) {
      this.firstValue = parseFloat(this.displayValue);
    }
    this.operator = op;
    this.displayValue = ''; // Limpa o display para o próximo valor
  }
  calculate() {
    if (this.operator === null || this.displayValue === '') {
      return;
    }
    this.secondValue = parseFloat(this.displayValue);
    let result: number;
    switch (this.operator) {
      case '+':
        result = this.firstValue! + this.secondValue!;
        break;
      case '-':
        result = this.firstValue! - this.secondValue!;
        break;
      case '*':
        result = this.firstValue! * this.secondValue!;
        break;
      case '/':
        result = this.firstValue! / this.secondValue!;
        break;
      default:
        return;
    }
    this.displayValue = result.toString();
    this.firstValue = result;
    this.operator = null;
    this.secondValue = null;
  }
  clear() {
    this.displayValue = '';
    this.firstValue = null;
    this.operator = null;
    this.secondValue = null;
  }
  deleteLast() {
    this.displayValue = this.displayValue.slice(0, -1);
  }
}
