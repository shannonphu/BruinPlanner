majors: majors.txt
	echo "[" > majors.json
	cat majors.txt | awk '{ print "\t\""$$0"\",\t"}' >> majors.json
	echo "]" >> majors.json