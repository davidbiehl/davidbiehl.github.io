window.NhtFlash = {};


$(document).ready(function() {

(function(app) {
	app.FlashCard = Backbone.Model.extend({
		defaults: {
			question: "an unknown question...?",
			answer:   "the answer!"
		}
	});

	app.FlashCardCollection = Backbone.Collection.extend({
		model: app.FlashCard,
		nextQuestion: function() {
			var index = Math.floor((Math.random() * this.length))
			return this.at(index);
		}
	});

	function initializeQuestions() {
		var rawQuestions = [
			{
				question: "What template should you send when processing an advanced credit?",
				answer:   "Advanced refund"
			},
			{
				question: "Once an auth is voided, how long does it take to fall off / be released?",
				answer  : "2-10 Business Days"
			},
			{
				question: "What was the original name of Zappos.com?",
				answer  : "Shoesite.com"
			},
			{
				question: "True or False: Your leadlink has the authority to prioritize your projects",
				answer:   "True"
			},
			{
				question: "If a customer states they have printed a label, how can you confirm?",
				answer  : "The item will be in a return status"
			},
			{
				question: "True or False: You can follow a return to the warehouse using the return tracking number",
				answer  : "True"
			},
			{
				question: "What email template should be sent when you manually upgrade shipping?",
				answer  : "NDA Expedite"
			},
			{
				question: "What are the two main types of Holacracy meetings?",
				answer  : "Tactical & Governance"
			},
			{
				question: "What is the purpose of the special notes on an advance XO?",
				answer  : "To link the orders together"
			},
			{
				question: "In which situations is iZoogle useful?",
				answer  : "Viewing inventory and checking for future purchase orders"
			},
			{
				question: "True or False: We can cancel a single item from a multi-item order",
				answer  : "True"
			},
			{
				question: "If a customer returns an order placed with a coupon, can they use the same coupon code on another order?",
				answer  : "No"
			},
			{
				question: "True or False: It is Zappos policy to attach a credit card to an exchange",
				answer  : "True"
			},
			{
				question: "What would merit placing an alert on a customer's account?",
				answer  : "Courtesy exceptions and signature required or a preferred shipping method"
			},
			{
				question: "What is the cutoff time for next day delivery?",
				answer  : "1PM PST"
			},
			{
				question: "During conflict resolution, a method to resolve conflict was discussed. What is it called?",
				answer  : "The Hamburger Method"
			},
			{
				question: "True or False: E-Gift cards are refunded back to the same E-Gift card code",
				answer  : "True"
			},
			{
				question: "What status would prevent you from offering a customer an advance XO?",
				answer  : "Any status in [special]"
			},
			{
				question: "True or False: We ship to Alaska, HI, U.S. Territories, and APO/FPO addresses",
				answer  : "True"
			},
			{
				question: "What is the best way to wow a customer requesting an out of stock item?",
				answer  : "Notification list, offer to search other websites"
			},
			{
				question: "Who do you contact if a customer wants you to send them an email?",
				answer  : "followup@zappos.com"
			},
			{
				question: "True or False: An email address is a piece of information unique to an account",
				answer  : "True"
			},
			{
				question: "If a customer wants to email us, what email address would you provide?",
				answer  : "cs@zappos.com"
			},
			{
				question: "True or False: The cart will hold and keep items, making them unavailable to other customers",
				answer  : "False"
			},
			{
				question: "True or False: A new account in the system will automatically be upgraded to VIP",
				answer  : "False"
			},
			{
				question: "True or False: We accept debit cards with the Visa and Mastercard logos",
				answer  : "True"
			},
			{
				question: "List the benefits of being a VIP",
				answer  : "Expedited shipping and a special VIP phone number"
			},
			{
				question: "How does learning Zappos history move us forward?",
				answer  : "You tell me! :) (That's not the answer)"
			},
			{
				question: "What is the format for setting up an account without an email address?",
				answer  : "firstname.lastname@phonenumber.phone"
			},
			{
				question: "Name 2 core values",
				answer  : "Really? Pick 2 out of 10 :) (hint: look at your badge or the back of the training room)"
			},
			{
				question: "What is the complete return timeframe for a return",
				answer  : "One week plus 2-10 business days"
			},
			{
				question: "If you process an XO, what will be added to the return status?",
				answer  : "[special]"
			},
			{
				question: "What email template do we send for an auto XO?",
				answer  : "advance_xo"
			},
			{
				question: "What status can we generate a return label from?",
				answer  : "Shipped"
			},
			{
				question: "Where is the auto XO button located?",
				answer  : "On the Order ID page"
			},
			{
				question: "Why should customer complaints be welcomed?",
				answer  : "To keep the customer, fix any issues, build positive word of mouth"
			},
			{
				question: "Per policy, why would we offer an advanced credit?",
				answer  : "The customer received something wrong, defective or worn"
			},
			{
				question: "True or False: On a gift XO, any unused funds are refunded back to the gift recipient",
				answer  : "False"
			},
			{
				question: "Coupons expire automatically through the system after how many days?",
				answer  : "90 days"
			},
			{
				question: "What is the importance of keeping internal policies, internal?",
				answer  : "To prevent abuse and to keep the WOW"
			},
			{
				question: "True or False: Advanced refunds are for when the replacement is out of stock",
				answer  : "False"
			},
			{
				question: "True or False: Mass discount codes for Zappos can be found online",
				answer  : "False"
			},
			{
				question: "How much time do you have to make changes to an order?",
				answer  : "1 hour"
			},
			{
				question: "If you see [special] in a status, this indicates...",
				answer  : "We have done an advanced XO or an advanced refund"
			},
			{
				question: "True or False: Irate customers should be transferred to OV",
				answer  : "False"
			},
			{
				question: "Which department do you contact for escheatment?",
				answer  : "Order Verification"
			},
			{
				question: "What is a tension?",
				answer  : "When you feel there is a difference between what is and what could be"
			},
			{
				question: "What is the purpose of Zappos as defined in GlassFrog?",
				answer  : "To Live and Deliver WOW"
			},
			{
				question: "Which system would you use to send a customer a password reset email?",
				answer  : "Customer Service Central (CSC)"
			},
			{
				question: "What is the email address for OV and the Resource Desk?",
				answer  : "ov@zappos.com, rdesk@zappos.com"
			},
			{
				question: "How long does it take for recycled tracking numbers to update?",
				answer  : "24 hours"
			},
			{
				question: "If a customer has a charge they don't recognize, who do you call?",
				answer  : "Order Verification"
			},
			{
				question: "What link do you click on to add signature confirmation to an order?",
				answer  : "The Special Shipping link"
			},
			{
				question: "If a customer wants to talk to Tony, what email address do we give?",
				answer  : "ceo@zappos.com"
			},
			{
				question: "When do we capture the funds on an order?",
				answer  : "When it ships. Shipped status"
			},
			{
				question: "True or False: When cancelling an order, the system will void the authorization automatically",
				answer  : "True"
			}
		];

		return new app.FlashCardCollection(rawQuestions);
	}

	app.ApplicationView = Backbone.View.extend({
		el: "#app",
		start: function() {
			this.renderNextCard();
		},
		render: function() {
			this.flashCardView.render();
			this.$el.html(this.flashCardView.el);
		},
		renderNextCard: function() {
			this.flashCardView = new app.FlashCardView({model: this.collection.nextQuestion()});
			this.listenToOnce(this.flashCardView, 'done', this.renderNextCard);
			this.render();
		}
	});

	app.FlashCardView = Backbone.View.extend({
		tagName: "div",
		className: 'flashCard',
		events: {
			'click': 'onClick'
		},
		initialize: function() {
			this.answerShown = false;
		},
		render: function() {
			this.$el.html('<div class="leader">Question:</div><div class="question">' + this.model.get('question') + '</div>');
		},
		onClick: function(e) {
			if(this.answerShown) {
				this.trigger('done');
			} else {
				this.answerShown = true;
					this.$el.append('<br />	<div class="leader">Answer:</div><div class="answer">' + this.model.get('answer') + '</div>');
			}
		}
	});

	var questions = initializeQuestions();

	var theApp = new app.ApplicationView({collection: questions});
	theApp.start();

})(window.NhtFlash);

});
