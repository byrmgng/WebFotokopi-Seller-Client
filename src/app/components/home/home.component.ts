import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild('textAnimation') textAnimation!: ElementRef;
  @ViewChild('pen') pen!: ElementRef;

  constructor(private renderer: Renderer2, spinner:NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.animateLetters();
    });
  }

  animateLetters(): void {
    const letters = "WebFotokopi".split("");
    const textAnimationElement = this.textAnimation.nativeElement;

    while (textAnimationElement.firstChild) {
      textAnimationElement.removeChild(textAnimationElement.firstChild);
    }
    letters.forEach((letter, index) => {
      setTimeout(() => {

        const span = this.renderer.createElement("span");
        const text = this.renderer.createText(letter);
        this.renderer.appendChild(span, text);
        if (this.textAnimation.nativeElement)
          this.renderer.appendChild(this.textAnimation.nativeElement, span);

        this.renderer.setStyle(span, 'opacity', '1');
        this.renderer.setStyle(span, 'transform', 'translateY(0)');
      }, index * 200);
    });
  }

  animatePen(): void {
    if (this.pen.nativeElement) {
      this.renderer.setStyle(this.pen.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.pen.nativeElement, 'transform', 'translateX(0)');
    }
  }
}
