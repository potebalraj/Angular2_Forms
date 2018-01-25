import { Component , OnInit } from '@angular/core';

export class User
{
    firstName: string;
    lastName: string;
}

@Component({
    selector: 'template-form',
    styleUrls: ['./app/template/template-form.component.css'],
    templateUrl: './app/template/template-form.component.html'
})

export class TemplateFormComponent implements OnInit {
    user: User;
    submitted: boolean = false;

    ngOnInit() {
        this.user = {
            firstName: '',
            lastName: ''
        }
    }

    get diagnostic() {
        return JSON.stringify(this.user);
    }

    processForm() {
        console.log(this.user);
        this.submitted = true;
    }
}