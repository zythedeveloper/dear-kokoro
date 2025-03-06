import { createRouter, createWebHistory } from "vue-router";
import MyJournal from "../views/MyJournal.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import CreateJournal from "../views/CreateJournal.vue";
import JournalDetail from "../views/JournalDetail.vue";
import getDocument from '@/composables/getDocument.js';
import ChatBot from "../views/ChatBot.vue";
import Index from "../views/Index.vue";
import Insights from "../views/Insights.vue";
import DailyChecker from "../views/DailyChecker.vue";
import Quote from "../views/Quote.vue"

//route guard
import { auth } from "@/firebase/config";
const requireAuth = (to, from, next) => {
	let user = auth.currentUser;
	if (!user) {
		next({ name: "Login" });
	} else {
		next();
	}
};

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/journals",
			name: "MyJournal",
			component: MyJournal,
			beforeEnter: requireAuth,
		},
		{
			path: "/login",
			name: "Login",
			component: Login,
		},
		{
			path: "/signup",
			name: "Signup",
			component: Signup,
		},
		{
			path: "/journal/create",
			name: "CreateJournal",
			component: CreateJournal,
			beforeEnter: requireAuth,
		},
		{
			path: "/journals/:id",
			name: "JournalDetail",
			component: JournalDetail,
			beforeEnter: [requireAuth],
			props: true,
		},
		{
			path: "/chatbot",
			name: "ChatBot",
			component: ChatBot,
			beforeEnter: requireAuth,
		},
		{
			path: "/insights",
			name: "Insights",
			component: Insights,
			beforeEnter: requireAuth,
		},
		{
			path: "/",
			name: "home",
			component: Index,
		},
		{
			path: "/dailychecker",
			name: "DailyChecker",
			component: DailyChecker,
			beforeEnter: requireAuth,
		},
		{
			path: "/quote",
			name: "Quote",
			component: Quote,
			beforeEnter: requireAuth,
		},
		

	],
});


export default router;
