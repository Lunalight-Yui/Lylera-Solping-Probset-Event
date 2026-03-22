#include <stdlib.h>
#include <stdio.h>
#include <signal.h>

void sigsegv_handler(int sig) {
	char flag[50];
	FILE *f = fopen("flag.txt", "r");
	if (f == NULL) {
        printf("\n[!] Segfault terdeteksi, tapi flag.txt nggak ada.\n");
        exit(1);
    	}
    	fgets(flag, sizeof(flag), f);
    	printf("Sugoiii! mize kasih sesuatu: %s\n", flag);
    	exit(0);
}

void setup() {
        setvbuf(stdout, NULL, _IONBF, 0);
        signal(SIGSEGV, sigsegv_handler);
}

void mize() {
	char try[32];
	printf("mari kenalan. siapa kamu?\n");
	gets(try);
	printf("Hiii %s\n", try);
}

int main() {
	setup();
	mize();
	return 0;
}
