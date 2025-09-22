import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-basic-form',
  imports: [JsonPipe],
  templateUrl: './basic-form.html',
  styleUrl: './basic-form.scss'
})
export class BasicForm {

}
