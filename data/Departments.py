class Departments:
	def __init__(self):
		self.mapping = {
			'Aerospace Studies' : 'AERO ST',
			'African American Studies' : 'AF AMER',
			'African Studies' : 'AFRC ST',
			'American Indian Studies' : 'AM IND',
			'American Sign Language' : 'ASL',
			'Ancient Near East' : 'AN N EA',
			'Anesthesiology' : 'ANES',
			'Anthropology' : 'ANTHRO',
			'Applied Linguistics' : 'APPLING',
			'Arabic' : 'Arabic',
			'Archaeology' : 'ARCHEOL',
			'Architecture and Urban Design' : 'ARCH&UD',
			'Armenian' : 'ARMENIA',
			'Art' : 'Art',
			'Art History' : 'ART HIS',
			'Arts and Architecture' : 'ART&ARC',
			'Arts Education' : 'ARTS ED',
			'Computer Science' : 'COM SCI',
			'Electrical Engineering' : 'EL ENGR',
			'Mathematics' : 'MATH',
			'Mechanical and Aerospace Engineering' : 'MECH&AE',
			'Civil and Environmental Engineering' : 'C&EE',
			'Civil Engineering' : 'C&EE',
			'Program in Computing' : 'PIC',
			'Statistics' : 'STATS'
		}

	def get_abbreviation(self, department_name):
		return self.mapping[department_name]
		