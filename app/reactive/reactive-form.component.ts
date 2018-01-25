import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'reactive-form',
    templateUrl: './app/reactive/reactive-form.component.html',
   styles: [`
    .remove {
        cursor:pointer;
        float:right
    }
`],
    
})

export class ReactiveFormComponent implements OnInit {
    form: FormGroup;

    formErrors = {
        firstName: '',
        lastName: '',
        addresses: [
            {city: '', country:''}
        ]
    };

    validationMessages = {
        firstName: {
            required: 'First Name is required.',
            minlength: 'First Name must be at least 3 characters.',
            maxlength: 'First Name can\'t be more than 6 characters.'
        },
        lastName: {
            required: 'Last Name is required.',
            minlength: 'Last Name must be at least 3 characters.'
        },
        addresses: {
            city: {
                required: 'City is required.',
                minlength: 'City must be at least 3 characters.',
            },
            country: {
                required: 'Country is required.'               
            }
        }
    };


    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        //build the data model for our form
        this.buildfForm();
    }

    /**
     * Build the intial form
     */
    buildfForm() {
        //build the form       
        this.form = this.fb.group({
            firstName: ['', [Validators.minLength(3), Validators.maxLength(6)]],
            lastName: ['', [Validators.minLength(3)]],
            addresses: this.fb.array([
                this.createAddress()
            ])
        });

        console.log(this.form);

        //watch for changes and validate
        this.form.valueChanges.subscribe(data => this.validateForm());
    }

    /**
     * Validate the entite form
     */
    validateForm() {
        for (let field in this.formErrors) {
            //clear that input field errors
            this.formErrors[field] = '';
            // grab the input field by name
            let input = this.form.get(field);
            if (input.invalid && input.dirty) {
                //figure out the type of errors
                //loop over the formErrors field names                
                for (let error in input.errors) {
                    //assign that type of error message to a variable
                    this.formErrors[field] = this.validationMessages[field][error];
                }
            }
        }
        this.validateAddresses();
    }

    /**
     * Validate the addresses form array
     */
    validateAddresses() {
        // Grab the addresses formArray
        let addresses = <FormArray>this.form.get('addresses');

        //Clear the form errors
        this.formErrors.addresses = [];

        //Loop through however many form groups are in the form array
        let n = 1;
        while (n <= addresses.length) {
            // add the clear error back
            this.formErrors.addresses.push({ city: '', country: '' })

            // Grab the specific group (address)
            let address = <FormGroup>addresses.at(n - 1);

            //validate the specific group. loop thorugh the Groups controls
            for (let field in address.controls) {
                let input = address.get(field);

                //do the validation and save errors in formerrors if necessary
                if (input.invalid && input.dirty) {
                    for (let error in input.errors) {
                        this.formErrors.addresses[n - 1][field] = this.validationMessages.addresses[field][error];
                    }
                }
            }
            n++;
        }
    }

    createAddress() {
        return this.fb.group({
            city: ['', Validators.minLength(3)],
            country: ['']
        });
    }

    addAddress() {
        let addresses = <FormArray>this.form.get('addresses');
        addresses.push(this.createAddress());
    }

    removeAddress(i) {
        let addresses = <FormArray>this.form.get('addresses');
        addresses.removeAt(i);

    }

    processForm() {
        console.log("Processing", this.form.value)
    }
}