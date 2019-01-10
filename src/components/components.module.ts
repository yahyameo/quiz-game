import { NgModule } from '@angular/core';
import { FlashCardComponent } from './flash-card/flash-card';
import { BalanceToolbarComponent } from './balance-toolbar/balance-toolbar';
@NgModule({
	declarations: [FlashCardComponent,
    BalanceToolbarComponent],
	imports: [],
	exports: [FlashCardComponent,
    BalanceToolbarComponent]
})
export class ComponentsModule {}
