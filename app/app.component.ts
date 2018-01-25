import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styles: [`
`],
    template: `
 <!--<div>       
       <h2>Template Form</h2>        
        <template-form></template-form>
    </div>-->
 <div>       
       <h2>Reactive Form</h2>        
        <reactive-form></reactive-form>
    </div>
`
    
})

export class AppComponent {
    message = "Hello !";    
}